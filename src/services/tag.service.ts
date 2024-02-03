import tagRepository from "../repositories/tag.repository";
import Tag from "../models/tag.model";

class TagService {
  async getAllTags(): Promise<Tag[]> {
    try {
      return tagRepository.getAllTags();
    } catch (error) {
      console.error("Error fetching all tags in service:", error);
      throw error;
    }
  }

  async getTagById(id: number): Promise<Tag | null> {
    try {
      return tagRepository.getTagById(id);
    } catch (error) {
      console.error("Error fetching tag by ID in service:", error);
      throw error;
    }
  }

  async getTagByTag(tag: string): Promise<Tag | null> {
    try {
      const tagInfo = await Tag.findOne({ where: { tag } });

      return tagInfo || null;
    } catch (error) {
      console.error("Error fetching tag by tag in service:", error);
      throw error;
    }
  }

  async createTag(tagData: Partial<Tag>): Promise<Tag> {
    try {
      return tagRepository.createTag(tagData);
    } catch (error) {
      console.error("Error creating tag in service:", error);
      throw error;
    }
  }

  async saveTagsFromExcel(excelData: string[][]): Promise<void> {
    try {
      // Verificar se o formato dos dados do Excel está correto
      if (excelData.length < 4 || excelData[2].length < 5) {
        throw new Error("Formato de dados do Excel inválido");
      }

      for (const tagInfo of excelData.slice(3)) {
        const [tag, name, status, source, price] = tagInfo;

        if (
          tag &&
          name &&
          status !== undefined &&
          source &&
          price !== undefined
        ) {
          // Verificar se a tag já existe no banco de dados
          const existingTag = await this.getTagByTag(tag.toString());

          if (!existingTag) {
            const tagData = {
              tag: tag.toString(),
              name: name.toString(),
              status: parseInt(status.toString(), 10),
              source: source.toString(),
              price: parseFloat(price.toString()),
            };

            await this.createTag(tagData);
          } else {
            // A tag já existe, você pode tratar isso como quiser, por exemplo, ignorar, registrar um aviso, etc.
            console.warn(`Tag '${tag}' já existe. Ignorando.`);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao salvar as tags do Excel:", error);
      throw error;
    }
  }

  async updateTag(tag: string, tagData: Partial<Tag>): Promise<Tag | null> {
    try {
      if (!tag) {
        throw new Error("Tag parameter is required for update");
      }

      const [affectedCount] = await Tag.update(tagData, {
        where: { tag },
      });

      if (affectedCount > 0) {
        const updatedTag = await Tag.findOne({
          where: { tag },
        });

        return updatedTag;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating tag in service:", error);
      throw error;
    }
  }

  async deleteTag(tag: string): Promise<number> {
    try {
      if (!tag) {
        throw new Error("Tag parameter is required for deletion");
      }

      return tagRepository.deleteTag(tag);
    } catch (error) {
      console.error("Error deleting tag in service:", error);
      throw error;
    }
  }
}

export default new TagService();
