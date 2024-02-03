import Tag from "../models/tag.model";

class TagRepository {
  async getAllTags(): Promise<Tag[]> {
    return Tag.findAll();
  }

  async getTagById(id: number): Promise<Tag | null> {
    return Tag.findByPk(id);
  }

  async findByTag(tag: string): Promise<Tag | null> {
    try {
      const tagInfo = await Tag.findOne({ where: { tag } });

      return tagInfo || null;
    } catch (error) {
      console.error("Error finding tag by tag in repository:", error);
      throw error;
    }
  }

  async createTag(tagData: Partial<Tag>): Promise<Tag> {
    return Tag.create(tagData);
  }

  async updateTag(
    tag: string,
    tagData: Partial<Tag>
  ): Promise<[number, Tag[]]> {
    const [affectedCount, updatedTags] = await Tag.update(tagData, {
      where: { tag },
      returning: true,
    });

    return [affectedCount, updatedTags as Tag[]];
  }

  async deleteTag(tag: string): Promise<number> {
    return Tag.destroy({
      where: { tag },
    });
  }
}

export default new TagRepository();
