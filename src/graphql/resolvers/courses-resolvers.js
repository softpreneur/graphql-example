import { requireAuth } from "../../services/auth";
import Course from '../../models/Courses/Course';
import Sumaryzers from '../../models/Courses/Sumaryzer';
import CoursesAllowed from '../../models/Courses/CoursesAllowed';
import Sumaryzer from "../../models/Courses/Sumaryzer";

export default {
    //Adding sumaryzer's application to list of pending sumaryzers
    become_sumaryzer: async(_, args, { user }) => {
        try {
            let userInfo = await requireAuth(user);

            //Checking to see if user has applied already
            const sumaryzer = await Sumaryzers.findOne({ course_code:args.course_code, user:user });
            if (!sumaryzer) {
                //Adding to sumaryzers list if he hasn't applied for the specific course 
                await Sumaryzers.create({ user: user._id, ...args, faculty: userInfo.faculty, school: userInfo.school });
            } 
            return {
                message: "success",
                value: true
            }
        } catch (error) {
            return {
                message: "error",
                value: false
            }
        }

    },
    //Approving sumaryzers application
    approve_sumaryzer: async(_, args, { user }) => {
        try {
            let userInfo = await requireAuth(user);

            //Checking to see if the course has been added to courses
            const course = await Course.findOne({ course_code:args.course_code, user:user });
            if (!course) {
                //Creating course if course doesn't exist
                await Course.create({ user: user._id, ...args, faculty: userInfo.faculty, school: userInfo.school });
                //Removing application field from sumaryzers list
                await Sumaryzer.remove({user:user._id, course_code:args.course_code});
                //Adding course code to list of courses user is allowed to sumaryz
                await CoursesAllowed.create({ user: user, course_code: args.course_code });
            } 
            return {
                message: "success",
                value: true
            }
        } catch (error) {
            return {
                message: "error",
                value: false
            }
        }

    },
    //Approving sumaryzers application
    decline_sumaryzer: async(_, args, { user }) => {
        try {
            //let userInfo = await requireAuth(user);

            //Checking to see if the course has been added to courses
            await Sumaryzers.remove({ course_code:args.course_code, user:user });
            return {
                message: "success",
                value: true
            }
        } catch (error) {
            return {
                message: "error",
                value: false
            }
        }
    },
    //Getting list of sumaryzers application
    list_of_sumaryzers: async() => {
        try{
            return Sumaryzer.find({}).limit(20).sort({createdAt: -1});
        } catch (error){
            throw error;
        }
    },
    //Getting list of courses by default before user search for courses
    courses: async(_, args, { user }) => {
        try {
            let userInfo = await requireAuth(user);
            //Getting list of courses based on users's department and faculty
            return await Course.find({ $or: [{ $and: [{ school: userInfo.school, department: userInfo.department }] }, { faculty: userInfo.faculty }] }).limit(7);
        } catch (error) {
            throw error
        }
    },
    //Searching for course code by user
    search_course: async(_, { course_code }, { user }) => {
        try {
            let userInfo = await requireAuth(user);
            return Course.findOne({ $and: [{ course_code: course_code, school: userInfo.school }] });
        } catch (error) {
            throw error
        }
    }
}