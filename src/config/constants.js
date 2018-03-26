export default {
  PORT: process.env.PORT || 3000, //27017,
  DB_URL: "mongodb+srv://sumaryz:Motionb2K@cluster0.mongodb.net/",
  //For MongoDB Atlas
  //mongodb://sumaryz:Motionb2K@cluster0-shard-00-00-zgxed.gcp.mongodb.net:27017,cluster0-shard-00-01-zgxed.gcp.mongodb.net:27017,cluster0-shard-00-02-zgxed.gcp.mongodb.net:27017/sumaryz?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin
  //mongodb://motion:motionb2k@35.188.102.64/sumaryz
  //On GCP Compute Engine
  //mongodb://motion:motionb2k@35.188.102.64:27017/sumaryz,
  //Localhost
  //mongodb://localhost/sumaryz-main-db
  GRAPHQL_PATH: "/graphql",
  JWT_SECRET: "motionb2kforlife@cahuna",
  SUBSCRIPTIONS_PATH: "/subscriptions"
};