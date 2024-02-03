import { Router } from "express";
import { TagController } from "../controllers/tag.controller";

export class TagRoutes {
  router: Router;

  public tagController: TagController = new TagController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.tagController.getAllTags);
    this.router.get("/:id", this.tagController.getTagById);
    this.router.get("/tag/:tag", this.tagController.getTagByTag);
    this.router.post("/", this.tagController.createTag);
    this.router.put("/:tag", this.tagController.updateTag);
    this.router.delete("/:tag", this.tagController.deleteTag);
  }
}
