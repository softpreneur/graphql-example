"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  PORT: process.env.PORT || 3000, //27017,
  DB_URL: "mongodb+srv://motion:Motionb2K@sumary-v1-mwfwr.gcp.mongodb.net/sumaryzdb",
  //For MongoDB Atlas
  //mongodb+srv://motion:Motionb2K@sumary-v1-mwfwr.gcp.mongodb.net/sumaryzdb
  //mongodb://motion:motionb2k@35.188.102.64/sumaryz
  //On GCP Compute Engine
  //mongodb://motion:motionb2k@35.188.102.64:27017/sumaryz,
  //Localhost
  //mongodb://localhost/sumaryz-main-db
  GRAPHQL_PATH: "/graphql",
  JWT_SECRET: "motionb2kforlife@cahuna",
  SUBSCRIPTIONS_PATH: "/subscriptions"
};
//# sourceMappingURL=constants.js.map