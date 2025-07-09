import { gql } from "@apollo/client";

const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          ownerName
          reviewCount
          ratingAverage
          stargazersCount
        }
      }
    }
  }
`;

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export { GET_REPOSITORIES, AUTHENTICATE, ME };
