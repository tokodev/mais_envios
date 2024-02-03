import { Server } from "@overnightjs/core";
import { Application } from "express";
import * as http from "http";
import cors from "cors";
import config from "config";
import { apiErrorValidator } from "./middlewares/api-error-validator";
import { BaseRoutes } from "./routes";
import sequelize from "./database/sequelize";
import Tag from "./models/tag.model";
import { TagRoutes } from "./routes/tag.routes";
import bodyParser from "body-parser";

export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private port = config.get("App.port")) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupErrorHandlers();
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
      await Tag.sync(); //{ force: true }
      console.log("Database synchronized.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw error;
    }
  }

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
    this.app.use("/api", new BaseRoutes().router);
    this.app.use("/api/tags", new TagRoutes().router);
  }
}
