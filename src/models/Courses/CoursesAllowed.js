import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const CourseAllowedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    course_code: {
        type: String,
        maxlength: [8, "Max of 8 character"]
    }
}, { collection: 'courses_allowed' });
CourseAllowedSchema.plugin(timestamps);
export default mongoose.model('CourseAllowed', CourseAllowedSchema);