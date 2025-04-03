const purchasedCourses = `
  query PurchasedCourses($page: Int, $per: Int) {
    purchasedCourses(page: $page, per: $per) {
      courses {
        id
        name
        description
        price
        created_at
        updated_at
        live
      }
      pageInfo {
        page
        per
        totalPages
        totalRecords
      }
    }
  }
`

export default purchasedCourses;
