import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class Tag extends Model {
  public id!: number;
  public tag!: string;
  public name!: string;
  public status!: number;
  public source!: string;
  public price!: number;
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tag: {
      type: DataTypes.CHAR,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    source: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tags", // opcional: nome da tabela no banco de dados
    modelName: "Tag", // opcional: nome do modelo
  }
);

export default Tag;
