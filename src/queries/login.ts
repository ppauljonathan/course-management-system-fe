const login = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

export default login
