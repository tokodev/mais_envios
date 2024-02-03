import { Server } from "@overnightjs/core";
import { Application, RequestHandler } from "express";
import * as http from "http";
import cors from "cors";
import config from "config";
import { apiErrorValidator } from "./middlewares/api-error-validator";
import { BaseRoutes } from "./routes";
import sequelize from "./database/sequelize";
import Tag from "./models/tag.model";
import { TagRoutes } from "./routes/tag.routes";
import bodyParser from "body-parser";
import multer, { Multer } from "multer";
import path from "path";
import { readExcelBuffer } from "./utils/upload-xlsx";
import tagService from "./services/tag.service";

export class SetupServer extends Server {
  private server?: http.Server;
  private uploadMiddleware!: multer.Multer;

  constructor(private port = config.get("App.port")) {
    super();
  }

  private configureMulter(): void {
    const storage = multer.memoryStorage();

    const fileFilter = (
      req: Express.Request,
      file: Express.Multer.File,
      cb: any
    ) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== ".xlsx") {
        return cb(new Error("Only .xlsx files are allowed"), false);
      }
      cb(null, true);
    };

    this.uploadMiddleware = multer({ storage, fileFilter });
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupErrorHandlers();
    this.configureMulter();
    await this.initSequelize();
    this.routes();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  private async initSequelize(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log(
        "Connection to the database has been established successfully."
      );
      await sequelize.sync(); // { force: true }
      await Tag.sync({ force: true }); //{ force: true }
      console.log("Database synchronized.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw error;
    }
  }

  private handleFileUpload: RequestHandler = async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const excelData = readExcelBuffer(req.file.buffer);

      await tagService.saveTagsFromExcel(excelData);

      res
        .status(200)
        .json({ message: "File uploaded and data saved successfully." });
    } catch (error) {
      console.error("Error handling file upload:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public getApp(): Application {
    return this.app;
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info("Server listening on port: " + this.port);
    });
  }

  public routes(): void {
    if (!this.uploadMiddleware) {
      throw new Error("uploadMiddleware is not properly initialized");
    }

    this.app.post(
      "/api/upload",
      this.uploadMiddleware.single("file"),
      this.handleFileUpload.bind(this)
    );

    this.app.use("/api", new BaseRoutes().router);
    this.app.use("/api/tags", new TagRoutes().router);
  }
}
