import Post from "../../models/Posts/Post";
import PostCommentUpvote from '../../models/Posts/CommentUpvote';
import PostCommentDownvote from '../../models/Posts/CommentDownvote';
import PostComment from '../../models/Posts/PostComment';
import { requireAuth } from '../../services/auth';

export default {
  //Currently logged in user answering questions
  create_post_comment: async (_, args, { user }) => {
    try {
      //Authenticating user
      await requireAuth(user);
      const comment = await PostComment.create({ user: user._id, ...args });
      if (comment) {
        //Increasing the number of counts of answers by 1
        await Post.update({ _id: comment.post }, { $inc: { no_answers: +1 } });
        return comment;
      }
      throw new Error("An error occured");
    } catch (error) {
      throw error;
    }
  },
  //Getting the last 7 answers
  post_comments: async (_, { post, cursor, limit }, { user }) => {
    try {
      //Authenticating user
      await requireAuth(user);
      if(cursor){
          return await PostComment.find({ post: post, createdAt: { $lt: cursor } }).limit(limit);
      }
      return await PostComment.find({ post: post }).limit(limit);
    } catch (error) {
      throw error;
    }
  },
  upvote_post_comment: async (_, { comment }, { user }) => {
    try {
      await requireAuth(user);
      //Checking if comment has been upvoted
      let check = await PostCommentUpvote.findOne({
        user: user._id,
        comment: comment
      });
      let v;
      if (!check) {
        //Creating new comment upvote document
        await PostCommentUpvote.create({ user: user._id, comment: comment });
        await PostComment.update({ _id: comment }, { $inc: { upvote_no: +1 } });
        v = true;
      } else {
        //If it exist, remove it
        await PostCommentUpvote.remove({ user: user._id, comment: comment });
        await PostComment.update({ _id: comment }, { $inc: { upvote_no: -1 } });
        v = false;
      }
      return { message: "success", value: v };
    } catch (error) {
      return {
        message: "error",
        value: true
      };
    }
  },
  downvote_post_comment: async (_, { comment }, { user }) => {
    try {
      await requireAuth(user);
      //Checking if comment has been upvoted
      let check = await PostCommentDownvote.findOne({ user: user._id, comment: comment });
      let v;
      if (!check) {
        //Creating new comment upvote document
        await PostCommentDownvote.create({ user: user._id, comment: comment });
        await PostComment.update( { _id: comment }, { $inc: { downvote_no: +1 } });
        v = true;
      } else {
        //If it exist, remove it
        await PostCommentDownvote.remove({ user: user._id, comment: comment });
        await PostComment.update( { _id: comment }, { $inc: { downvote_no: -1 } });
        v = false;
      }
      return { message: "success", value: v };
    } catch (error) {
      return {
        message: "error",
        value: true
      };
    }
  }
};