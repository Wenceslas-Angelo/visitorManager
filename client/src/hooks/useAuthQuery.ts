import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../API/auth";
import useAuthStore from "../stores/AuthStore";
import { AuthType } from "../types";

export const useRegister = () => {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: (userData: AuthType) => authApi.signup(userData),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return registerMutation;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const loginMutation = useMutation({
    mutationFn: (userData: AuthType) =>
      authApi.login(userData.matricule, userData.password),
    onSuccess: (user) => {
      login(user);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return loginMutation;
};
