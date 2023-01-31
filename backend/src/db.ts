import { Sequelize } from "sequelize";

const dbClient = new Sequelize("collector", "postgres", "password", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false
});

export default dbClient;
