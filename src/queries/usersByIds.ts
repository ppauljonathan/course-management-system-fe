const usersByIds = `
  query UsersByIds($page: Int, $per: Int, $ids: [Int!]!) {
    usersByIds(page: $page, per: $per, ids: $ids) {
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

export default usersByIds;
