const requestPasswordReset = `
  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      user {
        id
        first_name
        last_name
        email
        created_at
        updated_at
      }
      token
      expires_at
      errors {
        code
        message
        location
      }
    }
  }
`;

export default requestPasswordReset
