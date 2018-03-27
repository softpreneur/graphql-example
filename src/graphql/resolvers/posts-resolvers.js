import Post from '../../models/Posts/Post';
import PostComment from "../../models/Posts/PostComment";
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';
import User from '../../models/User';
import { withFilter } from 'graphql-subscriptions';

const NEW_POST = "new_post";
const POST_COMMENT_ADDED = "post_comment_added";

export default {
  //Creating post by logge user
  create_post: async (_, { content, sector }, { user }) => {
    try {
      //Authenticating user
      let userInfo = await requireAuth(user);
      //Creating new post
      let new_post = await Post.create({ user: user._id, content: content, sector: sector });
      //New post subscription
      pubsub.publish(NEW_POST, {[NEW_POST]: new_post});
      return new_post;
    } catch (error) {
      throw error;
    }
  },
  //Getting posts in users department or faculty
  posts: async (_, { cursor, limit }, { user }) => {
    try {
      //Authenticating user
      let userInfo = await requireAuth(user);
      //Checking if cursor is set
      if(cursor != undefined ){
        return await Post.find({ sector: sector }).limit(limit).sort({ createdAt: - 1 });
      }
      //If cursor is not provided
      return await Post.find({ sector: sector }).limit(limit).sort({ createdAt: - 1 });
    } catch (error) {
      throw error;
    }
  },
  //Getting psot created by logged user
  my_posts: async (_, { cursor, limit }, { user }) => {
    try {
      //Authenticating user
      let userInfo = await requireAuth(user);
      //Checking if cursor is set
      if(cursor != undefined ){
        return await Post.find({ user: user._id }, {createdAt: { $lt: cursor }}).limit(limit).sort({ createdAt: - 1 });
      }
      return await Post.find({ user: user._id }).limit(limit).sort({ createdAt: - 1 });
    } catch (error) {
      throw error;
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
  /*******************************************************************
   *******************************************************************
    Subscriptions come here
   *******************************************************************
  ********************************************************************/
  //Returns new post 
  new_post: {
    subscribe: withFilter(() => pubsub.asyncIterator(NEW_POST), (payload, variables ) => {
      return Boolean(payload.new_post.sector === variables.sector);
    })
  },
  //Returns new post comment 
  post_comment_added: {
    subscribe: withFilter(() => pubsub.asyncIterator(POST_COMMENT_ADDED), (payload, variables) => {
      return Boolean(toString(payload.post_comment_added.post) === toString(variables.post));
    })
  },
};