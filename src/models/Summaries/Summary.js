import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const SummarySchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    introduction: {
        type: String,
        maxlength: [200, "Max of 200 characters"]
    },
    content: {
        type: String,
        maxlength: [500, "Max of 500 characters "]
    },
    topic: {
        type: String,
        maxlength: [50, "Max of 50 character"]
    },
    report: {
        type: Boolean,
        default: false
    },
    no_comments: {
        type: Number,
        default: 0
    },
    upvote: {
        type: Schema.Types.ObjectId,
        ref: 'Upvote'
    },
    downvote: {
        type: Schema.Types.ObjectId,
        ref: 'Downvote'
    },
    upvote_no: {
        type: Number,
        default: 0
    },
    downvote_no: {
        type: Number,
        default: 0
    },
}, { collection: 'summaries' });

SummarySchema.plugin(timestamps);
export default mongoose.model('Summary', SummarySchema);