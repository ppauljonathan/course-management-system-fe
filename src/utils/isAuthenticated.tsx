function isAuthenticated(): boolean {
  const jwt = localStorage.getItem("accessToken");
  return !!jwt;
}

export default isAuthenticated;
