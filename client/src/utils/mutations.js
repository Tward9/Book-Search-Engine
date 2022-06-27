import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation NewUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                username
                email
                password
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($username: String!, $authors: [String]!, $description:    String!, $bookId: String!, $image: String!, $link: String!, $title: String!) {
        saveBook(username: $username, authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
            _id
            username
            email
            password
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation RemoveBook($username: String!, $bookId: String!) {
        removeBook(username: $username, bookId: $bookId) {
            _id
            username
            email
            password
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;