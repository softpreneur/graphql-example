import mongoose, { Schema } from 'mongoose';
//import timestamps from 'mongoose-timestamp';

const PostUpvoteSchema = new Schema({
    summary: {
        type: Schema.Types.ObjectId,
        ref: 'Summary'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'summary_upvotes' });

//UpvoteSchema.plugin(timestamps);
export default mongoose.model("SummaryUpvote", PostUpvoteSchema);