import { NavLink } from "react-router";

function TabBar() {
  const tabClasses = "text-xl grow text-center hover:bg-gray-200 dark:hover:bg-gray-600 pt-5 pb-5"
  const tabNames = [
    [ 'all', 'All Courses', ],
    [ 'purchased', 'Purchased Courses', ],
    [ 'created', 'Created Courses', ],
  ];


  return (
    <>
      <div className="flex justify-around mt-5 mb-5 border">
        {   
          tabNames.map(([category, name], index) => {
            const isActive = location.pathname === `/courses-list/${category}` ||
              (category === "all" && location.pathname === "/");

            return (
              <NavLink
                to={`/courses-list/${category}`}
                key={index}
                className={`${tabClasses} ${isActive ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
              >{name}</NavLink>
            )
          })
        }
      </div>
      </>
  )
}

export default TabBar;
