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

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _Post = require('../../models/Posts/Post');

var _Post2 = _interopRequireDefault(_Post);

var _PostComment = require('../../models/Posts/PostComment');

var _PostComment2 = _interopRequireDefault(_PostComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Date: _graphqlDate2.default,
  Post: {
    //Getting user info for post type
    user: function user(_, args, _ref) {
      var _user = _ref.user;
      return _User2.default.findById(_.user, { fname: 1, lname: 1, sector: 1 });
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
      return _User2.default.findById(_.user, { fname: 1, lname: 1, sector: 1 });
    }
  },
  Query: {
    me: _usersResolvers2.default.me,
    posts: _postsResolvers2.default.posts,
    my_posts: _postsResolvers2.default.my_posts,
    post_comments: _postsResolvers2.default.post_comments
  },
  Mutation: {
    create_account: _usersResolvers2.default.create_account,
    create_post: _postsResolvers2.default.create_post,
    create_post_comment: _postsResolvers2.default.create_post_comment
  },
  Subscription: {
    new_post: _postsResolvers2.default.new_post,
    post_comment_added: _postsResolvers2.default.post_comment_added
  }
};
//# sourceMappingURL=index.js.map