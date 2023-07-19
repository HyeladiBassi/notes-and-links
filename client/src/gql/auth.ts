import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      token
      email
      _id
    }
  }
`;

export const USER_REGISTER = gql`
  mutation createUser($input: CreateUserInput) {
    createUser(input: $input) {
      email
      _id
    }
  }
`;
