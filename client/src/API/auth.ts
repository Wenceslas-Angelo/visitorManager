import { API_BASE_URL } from "../config";
import { AuthType, LoginResponse, SignUpResponse } from "../types";

export const authApi = {
  signup: async (userData: AuthType): Promise<SignUpResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed on sign up request!`);
    }

    return await response.json();
  },

  login: async (
    matricule: number,
    password: string
  ): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matricule, password }),
    });

    if (!response.ok) {
      throw new Error(`Failed on login request`);
    }

    return await response.json();
  },
};
