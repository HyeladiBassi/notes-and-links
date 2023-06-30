import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation userOTP($input: UserLoginRequest) {
    userLogin(input: $input) {
      data {
        token
        user
      }
      error
      status
    }
  }
`;

export const USER_REGISTER = gql`
  mutation userOTP($input: UserRegisterRequest) {
    userRegister(input: $input) {
      data {
        token
      }
      error
      status
    }
  }
`;

