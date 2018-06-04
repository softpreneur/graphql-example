export default {
  PORT: process.env.PORT || 8080,
  DB_URL: "mongodb://root:Motionb2k@35.198.109.62:27017/admin",
  //DB_URL: "mongodb://localhost:27017/vp_db",
  GRAPHQL_PATH: "/graphql",
  JWT_SECRET: "motionboyforlife@cahona",
  SUBSCRIPTIONS_PATH: "/subscriptions"
};
