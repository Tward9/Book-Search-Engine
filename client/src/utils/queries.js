import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe($username: String!) {
    me(username: $username) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
      }
    }
  }
`;