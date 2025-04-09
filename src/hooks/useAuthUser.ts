import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getCurrentUser from "../utils/getCurrentUser";
import UserInterface from "../interfaces/graphql/users/userInterface";
import useToast from "./useToast";

const useAuthUser = () => {
  const [user, setUser] = useState<UserInterface>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser(showToast);
      setUser(currentUser);
    }

    fetchUser();
  }, [navigate, showToast]);

  return user;
};

export default useAuthUser;
