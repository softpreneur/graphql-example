"use strict";
require("babel-core/register");
require("babel-polyfill");
var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _http = require("http");

var _apolloServerExpress = require("apollo-server-express");

var _graphqlTools = require("graphql-tools");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _graphql = require("graphql");

require("./config/db");

var _schema = require("./graphql/schema");

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require("./graphql/resolvers");

var _resolvers2 = _interopRequireDefault(_resolvers);

var _constants = require("./config/constants");

var _constants2 = _interopRequireDefault(_constants);

var _middlewares = require("./config/middlewares");

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import mocks from './mocks';
var app = (0, _express2.default)();
(0, _middlewares2.default)(app);
app.use("/graphiql", (0, _apolloServerExpress.graphiqlExpress)({
  endpointURL: _constants2.default.GRAPHQL_PATH,
  subscriptionsEndpoint: "ws://127.0.0.1:" + _constants2.default.PORT + _constants2.default.SUBSCRIPTIONS_PATH
}));

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default
});

app.use(_constants2.default.GRAPHQL_PATH, (0, _apolloServerExpress.graphqlExpress)(function (req) {
  return {
    schema: schema,
    context: {
      user: req.user
    }
  };
}));

var graphQLServer = (0, _http.createServer)(app);
//mocks().then(() => {
graphQLServer.listen(_constants2.default.PORT, function (err) {
  if (err) {
    console.log(err);
  } else {
    //Creating subscription server
    new _subscriptionsTransportWs.SubscriptionServer({
      schema: schema,
      execute: _graphql.execute,
      subscribe: _graphql.subscribe
    }, {
      server: graphQLServer,
      path: _constants2.default.SUBSCRIPTIONS_PATH
    });
    console.log("Server running on " + _constants2.default.PORT);
  }
});
//});
//# sourceMappingURL=index.js.map