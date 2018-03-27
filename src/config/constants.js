export default {
  PORT: process.env.PORT || 3000,
  DB_URL: "mongodb://localhost/sumaryz-main-db",
  GRAPHQL_PATH: "/graphql",
  JWT_SECRET: "your-own-secret",
  SUBSCRIPTIONS_PATH: "/subscriptions"
};