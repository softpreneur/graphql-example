import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const SummaryCommentSchema = new Schema({
    summary: {
        type: Schema.Types.ObjectId,
        ref: 'Summary'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        maxlength: [200, 'Text must be less than 200']
    },
}, { collection: 'summary_comments' });
SummaryCommentSchema.plugin(timestamps);
export default mongoose.model('SummaryComment', SummaryCommentSchema);