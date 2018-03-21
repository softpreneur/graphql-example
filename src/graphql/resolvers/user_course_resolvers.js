import UserCourse from '../../models/Courses/UserCourse';
import { requireAuth } from '../../services/auth';

export default {
    //Adding new course by user ... (Joining)
    user_join_course: async(_, args, { user }) => {
        try {
            await requireAuth(user);
            let userJoin = await UserCourse.create({ user: user._id, ...args });
            if(userJoin){
                return{
                    message:"success",
                    value:true
                }
            } else{
                return{
                    message:"failed",
                    value:false
                }
            }
        } catch (error) {
            return{
                message:"error",
                value:false
            }
        }
    },
    //List of courses logged user has joined
    user_joined_courses: async(_, args, { user }) => {
        try {
            await requireAuth(user);
            return UserCourse.find({ user: user._id }).limit(7);
        } catch (error) {
            throw error;
        }
    }

}