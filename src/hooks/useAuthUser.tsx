import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getCurrentUser from "../utils/getCurrentUser";
import UserInterface from "../interfaces/graphql/users/userInterface";

const useAuthUser = () => {
  const [user, setUser] = useState<UserInterface>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    fetchUser();
  }, [navigate]);

  return user;
};

export default useAuthUser;
