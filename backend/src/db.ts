import { Sequelize } from "sequelize";

const dbClient = new Sequelize("collector", "postgres", "password", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false
});

// const dbClient = new Sequelize(
//   "postgres://collector:Ww6TFXRTIDT289cBujY0yw4VpVDwYsGV@dpg-cfvhsrndvk4rro62co1g-a/collector",
//   {
//     logging: false
//   }
// );

export default dbClient;
