export default {
  PORT: process.env.PORT || 3000, //27017,
  DB_URL: "mongodb://motion:motionb2k@35.188.102.64:27017/sumaryz",
  //mongodb://motion:motionb2k@35.188.102.64/sumaryz
  //mongodb://localhost/sumaryz-main-db
  GRAPHQL_PATH: "/graphql",
  JWT_SECRET: "motionb2kforlife@cahuna",
  SUBSCRIPTIONS_PATH: "/subscriptions"
};