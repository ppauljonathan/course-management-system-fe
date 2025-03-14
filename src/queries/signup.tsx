const signup = `
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      user {
        id
        first_name
        last_name
        email
        created_at
        updated_at
      }
      jwt
      errors {
        code
        message
        location
      }
    }
  }
`;

export default signup
