import Icon from "./Icon"

function Header() {
  return(
    <>
      <div className="bg-gray-800 flex-12 flex-row">
        <div className="flex-10/12">
          <p className="text-gray-50 text-4xl p-2 pl-3">Course Management System</p>
        </div>
        <div className="flex-2/12">
          <Icon iconName="user"/>
        </div>
      </div>
    </>
  )
}

export default Header
