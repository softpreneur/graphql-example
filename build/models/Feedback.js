"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedbackSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  suggestion_type: String,
  content: String
}, { collection: "feedback" });
FeedbackSchema.plugin(_mongooseTimestamp2.default);
exports.default = _mongoose2.default.model("Feedback", FeedbackSchema);
//# sourceMappingURL=Feedback.js.map