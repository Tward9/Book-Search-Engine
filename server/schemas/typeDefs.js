const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int!
        savedBooks: [Book]!
    }

    type Book {
        bookId: String!
        authors: [String]!
        description: String!
        title: String!
        image: String!
        link: String!
    }

    input saveBookInput {
        authors: [String]!
        description: String!
        bookId: String!
        image: String!
        link: String!
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me(username: String!): User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(
            userId: ID!
            input: saveBookInput
        ): User
        removeBook(bookId: String!): User
    }
  
`;

module.exports = typeDefs;