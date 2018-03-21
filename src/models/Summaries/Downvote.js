import mongoose, { Schema } from 'mongoose';
//import timestamps from 'mongoose-timestamp';

const SummaryDownvoteSchema = new Schema({
    summary: {
        type: Schema.Types.ObjectId,
        ref: 'Summary'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'summary_downvotes' });

//UpvoteSchema.plugin(timestamps);
export default mongoose.model("SummaryDownvote", SummaryDownvoteSchema);