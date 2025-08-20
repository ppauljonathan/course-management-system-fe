const users = `
  query Users($page: Int, $per: Int, $searchTerm: String) {
    users(page: $page, per: $per, searchTerm: $searchTerm) {
      users {
        id
        first_name
        last_name
        email
      }
      pageInfo {
        page
        per
        totalPages
        totalRecords
      }
    }
  }
`;

export default users;
