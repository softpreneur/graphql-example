import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    content: String,
    sector: {
      type: String,
      index: true
    },
    },
  { collection: "posts" }
);
PostSchema.plugin(timestamps);
PostSchema.index({ createdAt: 1 });
export default mongoose.model('Post', PostSchema);