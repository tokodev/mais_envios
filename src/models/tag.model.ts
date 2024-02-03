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
    tag: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    timestamps: true,
  }
);

export default Tag;
