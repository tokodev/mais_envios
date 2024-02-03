import { Router, Request, Response } from "express";

export class BaseRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    // For TEST only ! In production, you should use an Identity Provider !!
    this.router.get("/", (req: Request, res: Response) => {
      res.send("API de Etiquetas");
    });
  }
}
