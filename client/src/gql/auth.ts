import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      _id
      email
      name
    }
  }
`;

export const USER_REGISTER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      name
      email
    }
  }
`;
