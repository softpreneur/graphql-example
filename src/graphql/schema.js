export default `
    scalar Date
    type Status {
       message: String!
       value: Boolean
    }
    type Auth{
        token: String!
    }
    type User {
        _id: ID!
        phone: String!
        fname: String
        lname: String
        createdAt: Date!
    }
    type Post {
        _id: ID!
        user: User!
        content: String!
        comments: [PostComment]
        sector: String
        createdAt: Date!
    }
    type PostComment {
        _id: ID!
        user: User!
        post: Post!
        comment: String!
        createdAt: Date!
    }
    type Query {
        me: User
        posts(cursor: Date, limit: Int!): [Post]
        my_posts(cursor: Date, limit: Int!): [Post]
        post_comments(post: ID!, cursor: Date, limit: Int!): [PostComment]
    }
    type Mutation {
        create_account(phone: String!, fname: String, lname: String, email: String): Auth
        create_post(question: String!): Post
        create_post_comment(post: ID!, comment: String!): PostComment 
    }
    type Subscription {
        new_post(sector: String!): Post
        post_comment_added(post: ID!): PostComment
    }
    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;