import User from '../../models/User';
import Feedback from '../../models/Feedback'
import { requireAuth } from '../../services/auth';
import { NewCoin } from "../../models/NewCoin";
export default {
  //Checking user phone number if it exist in database
  phone_check: async (_, { phone }) => {
    try {
      //Checking if phone number exist
      const user = await User.findOne({ phone: phone }, { school: 1, _id: 0 });
      //If user phone number exist
      let msg = 'new_user', v = true;
      if (user) {
        //Checking if the school exist
        if(user.school){
          msg = 'profile_completed';
          v = true
        } else {
          msg = "profile_incomplete";
          v = true
        }
      } 
      return {
        message: msg,
        value: v
      };
    } catch (error) {
      return {
        message: "error",
        value: true
      };
      //throw error;
    }
  },
  //Updating new user name or un-verify user after successfully verification of phone
  update_name: async (_, { phone, fname, lname, email }) => {
    try {
      //Checking if user exist
      let user = await User.findOne({ phone: phone });
      //If user doesn't exist
      if(!user){
          user = await User.create({ phone: phone, lname: lname, fname: fname, email: email });
      } 
      //Creating token for user
      return {
          token: user.createToken()
      }
    } catch (error) {
      throw error;
    }
  },
  //Updating full account details on successful login
  update_account: async (_, { school, faculty, department, level, dob }, { user }) => {
    try {
      //authenticating user
      await requireAuth(user);
      const userUpdate = await User.update( { _id: user._id }, { $set: { school: school, faculty: faculty, department: department, dob: dob, level: level } } );
      if (userUpdate) {
        return {
          message: "success",
          value: true
        }
      }
    } catch (error) {
      return {
        message: "error",
        value: false
      };
    }
  },
  //Returning current logged user
  me: async (_, args, { user }) => {
    try {
      return await requireAuth(user);
    } catch (error) {
      throw error;
    }
  },
  //For admin use only
  add_coin: async (_, { userId, number, ref_code }, { user }) => {
    try {
      await User.update({ _id: userId }, { coin: number });
      await NewCoin.create({ user: userId, no_coin: number, ref_code: ref_code })
      return {
        message: "success",
        value: true
      }
    } catch (error) {
      return {
        message: "error",
        value: false
      };
    }
  },
  submit_suggestion: async (_, { suggestion_type, content }, { user }) => {
      try{
          await requireAuth(user);
          const check = await Feedback.findOne({ user:user._id, suggestion_type: suggestion_type, content:content });
          if(!check){
              await Feedback.create({ user:user._id, suggestion_type:suggestion_type, content:content });
          }
          return { 
              message: "success", 
              value: true 
          };
      } catch(error){
        return { 
            message: "error", 
            value: true 
        };
      }
  },
  user_suggestions: async(_, args, { user }) => {
      try {
          //await requireAuth(user);
          return await Feedback.find({}).limit(20);
      } catch (error){
          throw error
      }
  }
};