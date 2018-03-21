import Summary from '../../models/Summaries/Summary';
import Upvote from '../../models/Summaries/Upvote';
import Downvote from '../../models/Summaries/Downvote';
import SummaryComment from '../../models/Summaries/SummaryComment';
import SavedSummary from '../../models/Summaries/SavedSummary';
import SummaryStatus from '../../models/Summaries/UserSummaryStatus';
import { requireAuth } from '../../services/auth';
import User from '../../models/User';
import { pubsub } from '../../config/pubsub';
//import { constants } from 'os';

const SUMMARY_ADDED = "summary_added";
const SUMMARY_COMMENT_INCREASED = "summary_comment_increased";
const NEW_SUMMARY_COMMENT = "new_summary_comment";
const SUMMARY_UPVOTED = "summary_upvoted";
const SUMMARY_DOWNVOTED = "summary_downvoted";

export default {
  //Creating summary by summarizer
  create_summary: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      //Checking if the exact summary has been created
      let check = await Summary.findOne({ user: user._id, course: args.course, topic: args.topic });
      if (check) {
        return { message: "success", value: true };
      } else {
        //Creating summary by user
        let summary = await Summary.create({ user: user._id, ...args });
        //Creating upvote with a status of false for the summary
        await Upvote.create({ summary: summary._id, user: user._id, status: false });
        //Creating downvote with a status of (false) for the summary
        await Downvote.create({ summary: summary._id, user: user._id, status: false });

        //Subscription for new summary
        pubsub.publish(SUMMARY_ADDED, { [SUMMARY_ADDED]: summary });
        //Responding to user with success message
        return { message: "success", value: true };
      }
    } catch (error) {
      return {
        message: "error",
        value: true
      };
    }
  },
  //getting list of summaries for logged student base on course selected
  summaries: async (_, { course }, { user }) => {
    try {
      await requireAuth(user);
      return await Summary.find({ course: course, report: false }).sort({ createdAt: -1 }).limit(7);
    } catch (error) {
      throw error;
    }
  },
  //Viewing specific summary by logged user
  view_summary: async (_, { summary }, { user }) => {
    try {
      let userInfo = await requireAuth(user);
      //Checking if the user has already viewed the summary
      let view_status = await SummaryStatus.findOne({ summary: summary, user: userInfo._id });
      if (view_status) {
        let sumContent = await Summary.findById(summary).select({ content: 1, _id: 0 });
        return {
          message: sumContent,
          value: true
        };
      } else {
        //Checkin to see if logged user coin is greater or equal to 2
        if (userInfo.coin >= 2) {
          let sumContent = await Summary.findById(summary).select({ content: 1, _id: 0 });
          //Creating new document for user view status
          await SummaryStatus.create({ user: user._id, summary: summary, view_status: true });
          //reducing the log user coin after successful viewing
          await User.update({ _id: userInfo._id }, { coin: userInfo.coin - 2 });
          return {
            message: sumContent,
            value: true
          };
        } else {
          //When user has no
          return {
            message: "no_coin",
            value: false
          };
        }
      }
    } catch (error) {
      return {
        message: "error",
        value: true
      };
    }
  },
  //Reporting specific sumamry by user reading it
  report_summary: async (_, { summary }, { user }) => {
    try {
      await requireAuth(user);
      //Updating report status to true
      let report = await Summary.update({ _id: summary }, { $set: { report: true } });
      let m = "failed";
      if (report) {
        m = "success"
      } 
      return {
        message: m,
        value: true
      }
    } catch (error) {
      return {
        message: "error",
        value: true
      };
    }
  },
  //Un-reeporting summary by admin
  un_report_summary: async (_, { summary }, { user }) => {
    try {
      //await requireAuth(user);
      await Summary.update({ _id: summary }, { $set: { report: false } });
      return {
        message: "success",
        value: true
      };
    } catch (error) {
      return {
        message: error,
        value: true
      };
    }
  },
  //Getting reported summaries
  reported_summaries: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
      return Summary.find({ report: true }).limit(10);
    } catch (error) {
      throw error;
    }
  },
  //Creating comment by a user viewing a summary
  create_summary_comment: async (_, { summary, comment }, { user }) => {
    try {
      await requireAuth(user);
      //Check if the exact comment exist
      let check = await SummaryComment.findOne({  summary: summary, user: user._id, comment: comment });
      if (!check) {
        //Creating comment
        await SummaryComment.create({ user: user._id, summary: summary, comment: comment });
        //Increasing the number of comments by 1 for the summary
        let new_summary = await Summary.findByIdAndUpdate({ _id: summary },{ $inc: { no_comments: + 1 } }, { new: true });
        //Subscription for new comments added 
        pubsub.publish(NEW_SUMMARY_COMMENT, { [NEW_SUMMARY_COMMENT]: new_summary });
      }
      return {
        message: "success",
        value: true
      };
    } catch (error) {
      return {
        message: "error",
        value: true
      };
    }
  },
  //Getting list of summary comments
  summary_comments: async (_, { summary }, { user }) => {
    try {
      await requireAuth(user);
      //Getting last 7 comments
      return await SummaryComment.findOne({ summary: summary }).sort({ createdAt: -1 }).limit(7);
    } catch (error) {
      throw error;
    }
  },
  //Upvoting summary by log in user
  upvote_summary: async (_, { summary }, { user }) => {
    try {
      await requireAuth(user);
      //Check if user has upvoted
      const status = await Upvote.findOne( { user: user._id, summary: summary });
      let v, new_summary_upvote;
      if (!status) {
        //Creating new upvote and updating summary
        await Upvote.create({ summary: summary, user: user._id });
        new_summary_upvote = await Summary.findByIdAndUpdate(summary, { $inc: { upvote_no: + 1 } }, { new: true });
        v = true;
      } else {
        //Removing upvote if it exist
        await Upvote.remove( { user: user._id, summary: summary });
        new_summary_upvote = await Summary.findByIdAndUpdate(summary, { $inc: { upvote_no: - 1 } }, { new: true });
        v = false;
      }
      //Returning updated summary to subscribed user
      pubsub.publish(SUMMARY_UPVOTED, { [SUMMARY_UPVOTED]: new_summary_upvote });
      return {
        message: "success",
        value: v
      };
    } catch (error) {
      return {
        message: error,
        value: true
      };
    }
  },
  //Downvoting summary by log in user
  downvote_summary: async (_, { summary }, { user }) => {
    try {
      await requireAuth(user);
      //Check if user has upvoted
      const status = await Downvote.findOne({ user: user._id, summary: summary });
      let v, new_summary_downvote;
      if (!status) {
        //If the user has not downvoted at all
        await Downvote.create({ summary: summary, user: user._id });
        new_summary_downvote = await Summary.findByIdAndUpdate(summary, { $inc: { downvote_no: + 1 } }, { new: true });
        v = true;
      } else {
        //If user has already un-downvote and want to downvote again
        await Downvote.remove({ user: user._id, summary: summary });
        new_summary_downvote = await Summary.findByIdAndUpdate(summary, { $inc: { downvote_no: - 1 } }, { new: true });
        v = true;
      }
      //Returning the updated summary to users that has subscribed to this summary
      pubsub.publish(SUMMARY_DOWNVOTED, { [SUMMARY_DOWNVOTED]: new_summary_downvote });
      return {
        message: "success",
        value: v
      };
    } catch (error) {
      return {
        message: "error",
        value: true
      };
    }
  },
  /*******************************************************************
   *******************************************************************
    Subscriptions come here
   *******************************************************************
  ********************************************************************/
  //New summary Subscription
  summary_added: {
    //For new summary added
    subscribe: () => pubsub.asyncIterator(SUMMARY_ADDED)
  },
  //Return new comment
  new_summary_comment: {
    //For new comment added
    subscribe: () => pubsub.asyncIterator(NEW_SUMMARY_COMMENT)
  },
  //Return the whole summary with increase or decrease in the number upvote 
  summary_upvoted: {
    //For increase in summary upvote
    subscribe: () => pubsub.asyncIterator(SUMMARY_UPVOTED)
  },
  //Returns the whole summary with increase or decrease in the number of downvotes
  summary_downvoted: {
    //For increase in summary upvote
    subscribe: () => pubsub.asyncIterator(SUMMARY_DOWNVOTED)
  },
};