import mongoose, { Schema } from 'mongoose';
//import timestamps from 'mongoose-timestamp';

const PostDownvoteSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'post_downvotes' });
//UpvoteSchema.plugin(timestamps);
export default mongoose.model('PostDownvote', PostDownvoteSchema);