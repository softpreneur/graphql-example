import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    question: String,
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course"
    },
    department: {
      type: String,
      index: true
    },
    faculty: {
      type: String,
      index: true
    },
    upvote_no: {
      type: Number,
      default: 0
    },
    downvote_no: {
      type: Number,
      default: 0
    },
    no_answers: {
      type: Number,
      default: 0
    }
  },
  { collection: "posts" }
);
PostSchema.plugin(timestamps);
PostSchema.index({ createdAt: 1 });
export default mongoose.model('Post', PostSchema);