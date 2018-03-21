import GraphQLDate from 'graphql-date';
import UserResolvers from './users-resolvers';
import PostResolvers from './posts-resolvers';
import CourseResolvers from './courses-resolvers';
import UserCourseResolver from './user_course_resolvers';
import SummaryResolvers from './summaries-resolvers';
import SearchResolvers from '../resolvers/seach_resolvers';

import User from '../../models/User';
import Summary from '../../models/Summaries/Summary';
import Post from '../../models/Posts/Post';
import PostComment from '../../models/Posts/PostComment';
import UserCourse from '../../models/Courses/UserCourse';
import SavedSummary from "../../models/Summaries/SavedSummary";
import Upvote from '../../models/Summaries/Upvote';
import Downvote from '../../models/Summaries/Downvote';
import Course from '../../models/Courses/Course';
//import Summary from '../../models/Summaries/Summary';
export default {
  Date: GraphQLDate,
  Post: {
    //Getting user info for post type
    user: (_, args, { user }) => User.findById(_.user, { fname: 1, lname: 1, department: 1 }),
    comments: (_, args, { user }) => PostComment.find({ post: _._id }).limit(5)
  },
  User: {
  },
  PostComment: {
    //resolving user field in PostComment with result from selection of post comments
    user: (_, args, { user }) => User.findById(_.user, {fname: 1, lname: 1, department: 1 }),
  },
  Course: {
    user: (_, args, { user }) => User.findById(_.user).select({ fname: 1, lname: 1 })
  },
  Summary: {
    //Getting upvote status for each summary
    //upvote: (_, args, { user }) => Upvote.findOne({ user: _.user, summary: _._id }).select({ status: 1, _id: 0 }),
    //Getting downvote status for each summary
    //downvote: (_, args, { user }) => Downvote.findOne({ user: _.user, summary: _._id }).select({ status: 1, _id: 0 }),
    //Getting the author name for each summary
    user: (_, args, { user }) => User.findById(_.user).select({ fname: 1, lname: 1 })
  },
  SummaryComment: {
    user: (_, args, { user }) => User.findById(_.user).select({ name: 1 })
  },
  Suggestions: {
    user: (_, args, { user }) =>
      User.findById(_.user).select({ name: 1, phone: 1 })
  },
  Query: {
    me: UserResolvers.me,
    phone_check: UserResolvers.phone_check,
    posts: PostResolvers.posts,
    my_posts: PostResolvers.my_posts,
    post_comments: PostResolvers.post_comments,
    courses: CourseResolvers.courses,
    user_joined_courses: UserCourseResolver.user_joined_courses,
    search_course: CourseResolvers.search_course,
    summaries: SummaryResolvers.summaries,
    view_summary: SummaryResolvers.view_summary,
    list_of_sumaryzers: CourseResolvers.list_of_sumaryzers,
    summary_comments: SummaryResolvers.summary_comments,
    reported_summaries: SummaryResolvers.reported_summaries,
    user_suggestions: UserResolvers.user_suggestions,
    get_schools: SearchResolvers.get_schools,
    get_faculties: SearchResolvers.get_faculties,
    get_courses: SearchResolvers.get_courses,
  },
  Mutation: {
    update_name: UserResolvers.update_name,
    update_account: UserResolvers.update_account,
    create_post: PostResolvers.create_post,
    create_post_comment: PostResolvers.create_post_comment,
    become_sumaryzer: CourseResolvers.become_sumaryzer,
    approve_sumaryzer: CourseResolvers.approve_sumaryzer,
    decline_sumaryzer: CourseResolvers.decline_sumaryzer,
    user_join_course: UserCourseResolver.user_join_course,
    create_summary: SummaryResolvers.create_summary,
    add_coin: UserResolvers.add_coin,
    upvote_summary: SummaryResolvers.upvote_summary,
    downvote_summary: SummaryResolvers.downvote_summary,
    create_summary_comment: SummaryResolvers.create_summary_comment,
    report_summary: SummaryResolvers.report_summary,
    un_report_summary: SummaryResolvers.un_report_summary,
    submit_suggestion: UserResolvers.submit_suggestion,
    upvote_post: PostResolvers.upvote_post,
    downvote_post: PostResolvers.downvote_post,
    upvote_post_comment: PostResolvers.upvote_post_comment,
    downvote_post_comment: PostResolvers.downvote_post_comment
  },
  Subscription: {
    summary_added: SummaryResolvers.summary_added,
    new_summary_comment: SummaryResolvers.new_summary_comment,
    summary_upvoted: SummaryResolvers.summary_upvoted,
    summary_downvoted: SummaryResolvers.summary_downvoted,
    new_post: PostResolvers.new_post,
    post_upvote_updated: PostResolvers.post_upvote_updated,
    post_downvote_updated: PostResolvers.post_downvote_updated,
    post_comment_added: PostResolvers.post_comment_added,
    post_comment_increased: PostResolvers.post_comment_increased,
    post_comment_upvoted: PostResolvers.post_comment_upvoted,
    post_comment_downvoted: PostResolvers.post_comment_downvoted,
  }
};