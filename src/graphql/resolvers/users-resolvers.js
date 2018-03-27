import User from '../../models/User';
import Feedback from '../../models/Feedback'
import { requireAuth } from '../../services/auth';
import { NewCoin } from "../../models/NewCoin";
export default {
  //Updating new user name or un-verify user after successfully verification of phone
  create_account: async (_, { phone, fname, lname, email }) => {
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
  //Returning current logged user
  me: async (_, args, { user }) => {
    try {
      return await requireAuth(user);
    } catch (error) {
      throw error;
    }
  }
};