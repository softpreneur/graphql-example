import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const PostCommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      index: true
    },
    comment: String,
    upvote_no: {
      type: Number,
      default: 0
    },
    downvote_no: {
      type: Number,
      default: 0
    }
  },
  { collection: "post_comments" }
);
PostCommentSchema.plugin(timestamps);
PostCommentSchema.index({ createdAt: 1 });
export default mongoose.model('PostComment', PostCommentSchema);