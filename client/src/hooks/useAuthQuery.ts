import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../API/auth";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlice";
import { AuthType } from "../types";

export const useRegister = () => {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: (userData: AuthType) => authApi.signup(userData),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/connexion");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return registerMutation;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useMutation({
    mutationFn: (userData: AuthType) =>
      authApi.login(userData.matricule, userData.password),
    onSuccess: (user) => {
      dispatch(login(user));
      login(user);
      navigate("/visiteurs");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return loginMutation;
};
