'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _usersResolvers = require('./users-resolvers');

var _usersResolvers2 = _interopRequireDefault(_usersResolvers);

var _postsResolvers = require('./posts-resolvers');

var _postsResolvers2 = _interopRequireDefault(_postsResolvers);

var _coursesResolvers = require('./courses-resolvers');

var _coursesResolvers2 = _interopRequireDefault(_coursesResolvers);

var _user_course_resolvers = require('./user_course_resolvers');

var _user_course_resolvers2 = _interopRequireDefault(_user_course_resolvers);

var _summariesResolvers = require('./summaries-resolvers');

var _summariesResolvers2 = _interopRequireDefault(_summariesResolvers);

var _seach_resolvers = require('../resolvers/seach_resolvers');

var _seach_resolvers2 = _interopRequireDefault(_seach_resolvers);

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _Summary = require('../../models/Summaries/Summary');

var _Summary2 = _interopRequireDefault(_Summary);

var _Post = require('../../models/Posts/Post');

var _Post2 = _interopRequireDefault(_Post);

var _PostComment = require('../../models/Posts/PostComment');

var _PostComment2 = _interopRequireDefault(_PostComment);

var _UserCourse = require('../../models/Courses/UserCourse');

var _UserCourse2 = _interopRequireDefault(_UserCourse);

var _SavedSummary = require('../../models/Summaries/SavedSummary');

var _SavedSummary2 = _interopRequireDefault(_SavedSummary);

var _Upvote = require('../../models/Summaries/Upvote');

var _Upvote2 = _interopRequireDefault(_Upvote);

var _Downvote = require('../../models/Summaries/Downvote');

var _Downvote2 = _interopRequireDefault(_Downvote);

var _Course = require('../../models/Courses/Course');

var _Course2 = _interopRequireDefault(_Course);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Summary from '../../models/Summaries/Summary';
exports.default = {
  Date: _graphqlDate2.default,
  Post: {
    //Getting user info for post type
    user: function user(_, args, _ref) {
      var _user = _ref.user;
      return _User2.default.findById(_.user, { fname: 1, lname: 1, department: 1 });
    },
    comments: function comments(_, args, _ref2) {
      var user = _ref2.user;
      return _PostComment2.default.find({ post: _._id }).limit(5);
    }
  },
  PostComment: {
    //resolving user field in PostComment with result from selection of post comments
    user: function user(_, args, _ref3) {
      var _user2 = _ref3.user;
      return _User2.default.findById(_.user, { fname: 1, lname: 1, department: 1 });
    }
  },
  Course: {
    user: function user(_, args, _ref4) {
      var _user3 = _ref4.user;
      return _User2.default.findById(_.user).select({ fname: 1, lname: 1 });
    }
  },
  Summary: {
    //Getting upvote status for each summary
    //upvote: (_, args, { user }) => Upvote.findOne({ user: _.user, summary: _._id }).select({ status: 1, _id: 0 }),
    //Getting downvote status for each summary
    //downvote: (_, args, { user }) => Downvote.findOne({ user: _.user, summary: _._id }).select({ status: 1, _id: 0 }),
    //Getting the author name for each summary
    user: function user(_, args, _ref5) {
      var _user4 = _ref5.user;
      return _User2.default.findById(_.user).select({ fname: 1, lname: 1 });
    }
  },
  SummaryComment: {
    user: function user(_, args, _ref6) {
      var _user5 = _ref6.user;
      return _User2.default.findById(_.user).select({ name: 1 });
    }
  },
  Suggestions: {
    user: function user(_, args, _ref7) {
      var _user6 = _ref7.user;
      return _User2.default.findById(_.user).select({ name: 1, phone: 1 });
    }
  },
  Query: {
    me: _usersResolvers2.default.me,
    phone_check: _usersResolvers2.default.phone_check,
    posts: _postsResolvers2.default.posts,
    my_posts: _postsResolvers2.default.my_posts,
    post_comments: _postsResolvers2.default.post_comments,
    courses: _coursesResolvers2.default.courses,
    user_joined_courses: _user_course_resolvers2.default.user_joined_courses,
    search_course: _coursesResolvers2.default.search_course,
    summaries: _summariesResolvers2.default.summaries,
    view_summary: _summariesResolvers2.default.view_summary,
    list_of_sumaryzers: _coursesResolvers2.default.list_of_sumaryzers,
    summary_comments: _summariesResolvers2.default.summary_comments,
    reported_summaries: _summariesResolvers2.default.reported_summaries,
    user_suggestions: _usersResolvers2.default.user_suggestions,
    get_schools: _seach_resolvers2.default.get_schools,
    get_faculties: _seach_resolvers2.default.get_faculties,
    get_courses: _seach_resolvers2.default.get_courses
  },
  Mutation: {
    update_name: _usersResolvers2.default.update_name,
    update_account: _usersResolvers2.default.update_account,
    create_post: _postsResolvers2.default.create_post,
    create_post_comment: _postsResolvers2.default.create_post_comment,
    become_sumaryzer: _coursesResolvers2.default.become_sumaryzer,
    approve_sumaryzer: _coursesResolvers2.default.approve_sumaryzer,
    decline_sumaryzer: _coursesResolvers2.default.decline_sumaryzer,
    user_join_course: _user_course_resolvers2.default.user_join_course,
    create_summary: _summariesResolvers2.default.create_summary,
    add_coin: _usersResolvers2.default.add_coin,
    upvote_summary: _summariesResolvers2.default.upvote_summary,
    downvote_summary: _summariesResolvers2.default.downvote_summary,
    create_summary_comment: _summariesResolvers2.default.create_summary_comment,
    report_summary: _summariesResolvers2.default.report_summary,
    un_report_summary: _summariesResolvers2.default.un_report_summary,
    submit_suggestion: _usersResolvers2.default.submit_suggestion,
    upvote_post: _postsResolvers2.default.upvote_post,
    downvote_post: _postsResolvers2.default.downvote_post,
    upvote_post_comment: _postsResolvers2.default.upvote_post_comment,
    downvote_post_comment: _postsResolvers2.default.downvote_post_comment
  },
  Subscription: {
    summary_added: _summariesResolvers2.default.summary_added,
    new_summary_comment: _summariesResolvers2.default.new_summary_comment,
    summary_upvoted: _summariesResolvers2.default.summary_upvoted,
    summary_downvoted: _summariesResolvers2.default.summary_downvoted,
    new_post: _postsResolvers2.default.new_post,
    post_upvote_updated: _postsResolvers2.default.post_upvote_updated,
    post_downvote_updated: _postsResolvers2.default.post_downvote_updated,
    post_comment_added: _postsResolvers2.default.post_comment_added,
    post_comment_increased: _postsResolvers2.default.post_comment_increased,
    post_comment_upvoted: _postsResolvers2.default.post_comment_upvoted,
    post_comment_downvoted: _postsResolvers2.default.post_comment_downvoted
  }
};
//# sourceMappingURL=index.js.map