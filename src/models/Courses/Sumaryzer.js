import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const SumaryzerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    course_code: {
        type: String,
        maxlength: [8, "Max of 8 character"]
    },
    course_title: {
        type: String,
        maxlength: [50, "Max of 50 characters"]
    },
    department: String,
    faculty: String,
    school: String,
    description: {
        type: String,
        maxlength: [145, 'Text must be less than 200']
    },
}, { collection: 'sumaryzers' });
SumaryzerSchema.plugin(timestamps);
export default mongoose.model('Sumaryzers', SumaryzerSchema);