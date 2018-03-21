import mongoose, { Schema } from 'mongoose';
//import timestamps from 'mongoose-timestamp';

const PostCommentDownvoteSchema = new Schema(
  {
    comment: {
      type: Schema.Types.ObjectId,
      ref: "PostComment"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { collection: "post_comment_downvotes" }
);
//UpvoteSchema.plugin(timestamps);
export default mongoose.model('PostCommentDownvote', PostCommentDownvoteSchema);