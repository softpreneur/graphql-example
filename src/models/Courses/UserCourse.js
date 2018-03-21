import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const UserCourseSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    course_code: String,
    course_title: String,
    department: String,
    description: String
}, { collection: 'users_course' });
UserCourseSchema.plugin(timestamps);
export default mongoose.model('UserCourse', UserCourseSchema);