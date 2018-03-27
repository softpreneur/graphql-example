import GraphQLDate from 'graphql-date';
import UserResolvers from './users-resolvers';
import PostResolvers from './posts-resolvers';

import User from '../../models/User';
import Post from '../../models/Posts/Post';
import PostComment from '../../models/Posts/PostComment';
export default {
  Date: GraphQLDate,
  Post: {
    //Getting user info for post type
    user: (_, args, { user }) =>
      User.findById(_.user, { fname: 1, lname: 1, sector: 1 }),
    comments: (_, args, { user }) => PostComment.find({ post: _._id }).limit(5)
  },
  PostComment: {
    //resolving user field in PostComment with result from selection of post comments
    user: (_, args, { user }) =>
      User.findById(_.user, { fname: 1, lname: 1, sector: 1 })
  },
  Query: {
    me: UserResolvers.me,
    login: UserResolvers.login,
    posts: PostResolvers.posts,
    my_posts: PostResolvers.my_posts,
    post_comments: PostResolvers.post_comments
  },
  Mutation: {
    create_account: UserResolvers.create_account,
    create_post: PostResolvers.create_post,
    create_post_comment: PostResolvers.create_post_comment
  },
  Subscription: {
    new_post: PostResolvers.new_post,
    post_comment_added: PostResolvers.post_comment_added
  }
};