import Post from '../../models/Posts/Post';
import PostComment from "../../models/Posts/PostComment";
import Upvote from '../../models/Posts/Upvote';
import Downvote from "../../models/Posts/Downvote";
import Course from '../../models/Courses/Course';
import PostCommentUpvote from "../../models/Posts/CommentUpvote";
import PostCommentDownvote from "../../models/Posts/CommentDownvote";
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';
import User from '../../models/User';
import { withFilter } from 'graphql-subscriptions';

const NEW_POST = "new_post";
const POST_UPVOTE_UPDATED = "post_upvote_updated";
const POST_DOWNVOTE_UPDATED = "post_downvote_updated";
const POST_COMMENT_ADDED = "post_comment_added";
const POST_COMMENT_INCREASED = "post_comment_increased";
const POST_COMMENT_UPVOTED = "post_comment_upvoted";
const POST_COMMENT_DOWNVOTED = "post_comment_downvoted";

export default {
  //Creating post by logge user
  create_post: async (_, { question }, { user }) => {
    try {
      //Authenticating user
      let userInfo = await requireAuth(user);
      //Creating new post
      let new_post = await Post.create({ user: user._id, question: question, department: userInfo.department, faculty: userInfo.faculty });
      //New post subscription
      pubsub.publish(NEW_POST, {[NEW_POST]: new_post});
      console.log("********************");
      console.log(JSON.stringify(new_post));
      return new_post;
    } catch (error) {
      throw error;
    }
  },
  //Getting posts in users department or faculty
  posts: async (_, { cursor, limit }, { user }) => {
    try {
      //Authentication
      let userInfo = await requireAuth(user);
      if(cursor != undefined ){
        return await Post.find({$or: [{ department: userInfo.department }, { faculty: userInfo.faculty }], createdAt: { $lt: cursor }}).limit(limit).sort({ createdAt: - 1 });
      }
      return await Post.find({$or: [{ department: userInfo.department }, { faculty: userInfo.faculty }]}).limit(limit).sort({ createdAt: - 1 });
    } catch (error) {
      throw error;
    }
  },
  my_posts: async (_, { cursor, limit }, { user }) => {
    try {
      //Authentication
      let userInfo = await requireAuth(user);
      if(cursor != undefined ){
        return await Post.find({ user: user._id }, {createdAt: { $lt: cursor }}).limit(limit).sort({ createdAt: - 1 });
      }
      return await Post.find({ user: user._id }).limit(limit).sort({ createdAt: - 1 });
    } catch (error) {
      throw error;
    }
  },
  //Upvoting post by logged user
  upvote_post: async (_, { post }, { user }) => {
    try {
      await requireAuth(user);
      //Check if user has upvoted
      const status = await Upvote.findOne({ user: user._id, post: post });
      let v, updated_post_u, upvote_value;
      if (!status) {
        //Creating new upvote and updating summary
        await Upvote.create({ user: user._id, post: post });
        upvote_value = + 1;
        v = true;
      } else {
        //Removing upvote if it exist
        await Upvote.remove({ user: user._id, post: post });
        upvote_value = - 1;
        v = false;
      }
      //Updating post
      updated_post_u = await Post.findByIdAndUpdate(post, { $inc: { upvote_no: upvote_value } }, { new: true });
      //Subscription for increase in number of upvote
      pubsub.publish(POST_UPVOTE_UPDATED, {[POST_UPVOTE_UPDATED]: updated_post_u });
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
  //Downvoting post by log in user
  downvote_post: async (_, { post }, { user }) => {
    try {
      await requireAuth(user);
      //Check if user has upvoted
      const status = await Downvote.findOne({ user: user._id, post: post });
      let v, updated_post_d, downvote_value;
      if (!status) {
        //If the user has not downvoted at all
        await Downvote.create({ user: user._id, post: post });
        downvote_value = + 1;
        v = true;
      } else {
          //If user has already un-downvote and want to downvote again
        await Downvote.remove({ user: user._id, post: post });
        downvote_value = - 1;
        v = false;
      }
      updated_post_d = await Post.findByIdAndUpdate(post, { $inc: { downvote_no: downvote_value } }, { new: true });
      //Subscription for increase in the number of downvote
      pubsub.publish(POST_DOWNVOTE_UPDATED, { [POST_DOWNVOTE_UPDATED]: updated_post_d });
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
  //Currently logged in user answering questions
  create_post_comment: async (_, args, { user }) => {
    try {
      //Authenticating user
      await requireAuth(user);
      const comment = await PostComment.create({ user: user._id, ...args });
      if (comment) {
        //Increasing the number of counts of answers by 1
        let updated_post = await Post.findByIdAndUpdate(comment.post, { $inc: { no_answers: + 1 } }, { new: true });
        //Subscription for increase in number post comments
        pubsub.publish(POST_COMMENT_INCREASED, { [POST_COMMENT_INCREASED]: updated_post });
        //Subscription for new post comment
        pubsub.publish(POST_COMMENT_ADDED, { [POST_COMMENT_ADDED]: comment });
        return comment;
      } else {
        throw new Error("An error occured");
      }
    } catch (error) {
      throw error;
    }
  },
  //Getting the last 7 answers
  post_comments: async (_, { post, cursor, limit }, { user }) => {
    try {
      //Validating user
      await requireAuth(user);
      if(cursor){
        return await PostComment.find({ post: post, createdAt: { $lt: cursor } }).limit(limit).sort({ createdAt: - 1 });
      }
      return await PostComment.find({ post: post }).limit(limit).sort({ createdAt: - 1 });
    } catch (error) {
      throw error;
    }
  },
  upvote_post_comment: async (_, { comment }, { user }) => {
      try{
          await requireAuth(user);
          //Checking if comment has been upvoted 
          let check = await PostCommentUpvote.findOne({ user: user._id, comment: comment});
          let v, updated_post_comment_u, comment_upvote;
          if(!check){
              //Creating new comment upvote document
              await PostCommentUpvote.create({ user: user._id, comment: comment });
              comment_upvote = + 1;
              v = true;
          } else {
               //If it exist, remove it
                await PostCommentUpvote.remove({ user: user._id, comment: comment });
                comment_upvote = - 1;
                v = false;
          }
          updated_post_comment_u = await PostComment.findByIdAndUpdate(comment, {$inc: { upvote_no: comment_upvote }}, { new: true });
          //Subscription for post comment upvoted
          pubsub.publish(POST_COMMENT_UPVOTED, { [POST_COMMENT_UPVOTED]: updated_post_comment_u });
          return { message: "success", value: v };
      } catch(error){
          return {
              message: "error",
              value: true
          }
      }
  },
  downvote_post_comment: async (_, { comment }, { user }) => {
      try{
          await requireAuth(user);
          //Checking if comment has been upvoted 
          let check = await PostCommentDownvote.findOne({ user: user._id, comment: comment});
          let v, upvoted_post_comment_d, comment_upvote;
          if(!check){
              //Creating new comment upvote document
              await PostCommentDownvote.create({ user: user._id, comment: comment });
              comment_downvote = + 1;
              v = true;
          } else {
              //If it exist, remove it
              await PostCommentDownvote.remove({ user: user._id, comment: comment });
              comment_downvote = - 1;
              v = false;
          }
          upvoted_post_comment_d = await PostComment.findByIdAndUpdate(comment, {$inc: { downvote_no: comment_downvote }}, { new: true });
          //Subscription for post comment downvoted
          pubsub.publish(POST_COMMENT_DOWNVOTED, { [POST_COMMENT_DOWNVOTED]: upvoted_post_comment_d });
          return { message: "success", value: v };
      } catch(error){
          return {
              message: "error",
              value: true
          }
      }
  },
  /*******************************************************************
   *******************************************************************
    Subscriptions come here
   *******************************************************************
  ********************************************************************/
  //Returns new post 
  new_post: {
    subscribe: withFilter(() => pubsub.asyncIterator(NEW_POST), (payload, variables ) => {
      let b = Boolean(payload.new_post.department === variables.department);
      console.log(b);
      console.log(payload.new_post.department);
      console.log(variables.department);
      return b
    })
  },
  //Returns whole post with updated upvote number
  post_upvote_updated: {
    subscribe: withFilter(() => pubsub.asyncIterator(POST_UPVOTE_UPDATED), (payload, variables) => {
      return Boolean(payload.post_upvote_updated.department === variables.department);
    })
  },
  //Returns whole Post with updated downvote number
  post_downvote_updated: {
    subscribe: withFilter(() => pubsub.asyncIterator(POST_DOWNVOTE_UPDATED), (payload, variables) => {
      return Boolean(payload.post_downvote_updated.department === variables.department);
    })
  },
  //Returns new post comment 
  post_comment_added: {
    subscribe: withFilter(() => pubsub.asyncIterator(POST_COMMENT_ADDED), (payload, variables) => {
      return Boolean(toString(payload.post_comment_added.post) === toString(variables.post));
    })
  },
  //Returns posts with updated number
  post_comment_increased: {
    subscribe:withFilter(() => pubsub.asyncIterator(POST_COMMENT_INCREASED), (payload, variables) => {
      return Boolean(toString(payload.post_comment_increased.department) === toString(variables.department));
    })
  },
  //Returns post comment with updated upvote
  post_comment_upvoted: {
    subscribe: withFilter(() => pubsub.asyncIterator(POST_COMMENT_UPVOTED), (payload, variables) => {
      return Boolean(payload.post_comment_upvoted.department === variables.department);
    })
  },
  //Returns post comment with updated downvoted
  post_comment_downvoted: {
    subscribe: withFilter(() => pubsub.asyncIterator(POST_COMMENT_DOWNVOTED), (payload, variables) => {
      return Boolean(payload.post_comment_downvoted.department === variables.department);
    })
  }
};