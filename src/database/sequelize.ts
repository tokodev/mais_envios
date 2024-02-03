import { Dialect, Sequelize } from "sequelize";
import config from "config";

const sequelize = new Sequelize({
  dialect: config.get("Database.dialect") as Dialect,
  storage: config.get("Database.storage"),
});

export default sequelize;
