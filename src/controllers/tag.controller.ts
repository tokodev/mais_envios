import { Request, Response } from "express";
import tagService from "../services/tag.service";
import { readExcelBuffer } from "../utils/upload-xlsx";

export class TagController {
  async getAllTags(req: Request, res: Response): Promise<void> {
    const tags = await tagService.getAllTags();
    res.status(200).json(tags);
  }

  async getTagById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const tagId = parseInt(id, 10);
    const tag = await tagService.getTagById(tagId);

    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  }

  async getTagByTag(req: Request, res: Response): Promise<void> {
    try {
      const { tag } = req.params;
      const tagInfo = await tagService.getTagByTag(tag);

      if (tagInfo) {
        res.status(200).json(tagInfo);
      } else {
        res.status(404).json({ error: "Tag not found" });
      }
    } catch (error) {
      console.error("Error fetching tag by tag:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createTag(req: Request, res: Response): Promise<void> {
    const tagData = req.body;
    const newTag = await tagService.createTag(tagData);
    res.status(201).json(newTag);
  }

  async updateTag(req: Request, res: Response): Promise<void> {
    try {
      const { tag } = req.params;
      const tagData = req.body;

      const updatedTag = await tagService.updateTag(tag, tagData);

      if (updatedTag) {
        res.status(200).json(updatedTag);
      } else {
        res.status(404).json({ error: "Tag not found" });
      }
    } catch (error) {
      console.error("Error updating tag in controller:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteTag(req: Request, res: Response): Promise<void> {
    try {
      const { tag } = req.params;

      const rowsAffected = await tagService.deleteTag(tag);

      if (rowsAffected > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Tag not found" });
      }
    } catch (error) {
      console.error("Error deleting tag in controller:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
