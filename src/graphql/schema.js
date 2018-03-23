export default `
    scalar Date
    type Status {
       message: String!
       value: Boolean
    }
    type School {
       name: String
       code: String
    }
    type C {
       name: String
    }
    type Auth{
        token: String!
    }
    type User {
        _id: ID!
        phone: String!
        fname: String
        lname: String
        user_posts: Int
        coin: Int!
        school: String
        level: Int
        faculty: String
        department: String
        course_study: String
        email: String
        no_posts: Int!
        createdAt: Date!
    }
    type Post {
        _id: ID!
        user: User!
        question: String!
        comments: [PostComment]
        course: Course
        upvote_no: Int!
        downvote_no: Int!
        no_answers: Int!
        createdAt: Date!
    }
    type PostComment {
        _id: ID!
        user: User!
        post: Post!
        comment: String!
        upvote_no: Int!
        downvote_no: Int!
        createdAt: Date!
        updatedAt: Date!
    }
    type Course {
        _id: ID!
        user: User!
        course_code: String
        course_title: String
        department: String
        faculty: String
        description: String
    }
    type UserCourse {
        _id: ID!
        course: ID!
        course_code: String!
        course_title: String!
        department: String!
        description: String
        createdAt: Date!
    }
    type Summary {
        _id: ID!
        course: ID!
        user: User!
        topic: String
        introduction: String
        content: String
        no_comments: Int!
        upvote: Upvote
        downvote: Downvote!
        upvote_no: Int!
        downvote_no: Int!
        createdAt: Date!
    }
    type SummaryComment {
        _id: ID
        summary: ID!
        user: User
        comment: String!
        createdAt: Date!
    }
    type Upvote {
        summary: ID
        user: ID
        status: Boolean
    }
    type Downvote {
        summary: ID
        user: ID
        status: Boolean
    }
    type Suggestions {
        _id: ID
        user: User!
        suggestion_type: String!
        content: String!
        createdAt: Date
    }
    type Query {
        phone_check(phone: String!): Status
        me: User
        posts(cursor: Date, limit: Int!): [Post]
        my_posts(cursor: Date, limit: Int!): [Post]
        post_comments(post: ID!, cursor: Date, limit: Int!): [PostComment]
        courses:[Course]
        user_joined_courses: [UserCourse]
        search_course(course_code: String!):Course
        summaries(course: ID!): [Summary]
        view_summary(summary: ID!): Status
        list_of_sumaryzers: [Course]
        summary_comments(summary:ID!): [SummaryComment]
        reported_summaries: [Summary]
        user_suggestions: [Suggestions]
        get_schools(char: String): [School]
        get_faculties(char: String): [C]
        get_courses(char: String): [C]
    }
    type Mutation {
        update_name(phone: String!, fname: String, lname: String): Auth
        update_account(school: String!, faculty: String!, department: String!, level: Int, course_study: String, dob: String, email: String!): Status
        create_post(question: String!): Post
        create_post_comment(post: ID!, comment: String!): PostComment 
        become_sumaryzer(course_title: String!, course_code:String!, department:String!, faculty:String!, description: String!):Status
        approve_sumaryzer(course_title: String!, course_code:String!, department:String!, faculty:String!, description: String!):Status
        decline_sumaryzer(course_title: String!, course_code:String!, department:String!, faculty:String!, description: String!):Status
        user_join_course(course: ID!, course_code: String!, course_title: String!, department: String!, description: String): Status 
        create_summary(course: ID!, introduction: String!, topic: String!, content: String!): Status
        add_coin(user:ID!, number: Int!, ref_code: String!): Status
        upvote_summary(summary: ID):Status
        downvote_summary(summary: ID):Status
        create_summary_comment(summary: ID!, comment: String!): Status
        report_summary(summary: ID!): Status
        un_report_summary(summary: ID!): Status
        submit_suggestion(suggestion_type: String!, content: String!): Status
        upvote_post(post: ID!): Status
        downvote_post(post: ID!): Status
        upvote_post_comment(comment: ID!): Status
        downvote_post_comment(comment: ID!): Status
    }
    type Subscription {
        new_post(department: String!): Post
        post_upvote_updated(department: String!): Post
        post_downvote_updated(department: String!): Post
        post_comment_added(post: ID!): PostComment
        post_comment_increased(department: String!): Post
        post_comment_upvoted(department: String!): PostComment
        post_comment_downvoted(department: String!): PostComment
        summary_added: Summary
        new_summary_comment: Summary
        summary_upvoted: Summary
        summary_downvoted: Summary
    }
    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;