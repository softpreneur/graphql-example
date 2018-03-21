import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const SaveSummarySchema = new Schema({
    summary: {
        type: Schema.Types.ObjectId,
        ref: 'Summary'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'saved_summaries' });
SaveSummarySchema.plugin(timestamps);
export default mongoose.model('SavedSummary', SaveSummarySchema);