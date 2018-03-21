import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";

const FeedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    suggestion_type: String,
    content: String
  },
  { collection: "feedback" }
);
FeedbackSchema.plugin(timestamps);
export default mongoose.model("Feedback", FeedbackSchema);
