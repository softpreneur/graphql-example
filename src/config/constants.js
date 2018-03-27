export default {
  PORT: process.env.PORT || 8080,
  DB_URL: "mongodb://localhost/my_db",
  GRAPHQL_PATH: "/graphql",
  JWT_SECRET: "your-own-secret",
  SUBSCRIPTIONS_PATH: "/subscriptions"
};