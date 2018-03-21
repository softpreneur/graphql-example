import mongoose, { Schema } from 'mongoose';
const UserSummaryStatusSchema = new Schema({
    summary: {
        type: Schema.Types.ObjectId,
        ref: 'Summary'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    view_status: {
        type: Boolean,
        default: false
    }
}, { collection: 'summary_view_status' });
export default mongoose.model('UserSummaryStatusSchema', UserSummaryStatusSchema);