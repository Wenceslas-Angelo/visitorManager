import { API_BASE_URL } from "../config";
import { AuthType, LoginResponse, SignUpResponse } from "../types";

export const authApi = {
  signup: async (userData: AuthType): Promise<SignUpResponse> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseAsJson = await response.json();
      return responseAsJson as SignUpResponse;
    } catch (error) {
      throw error;
    }
  },

  login: async (
    matricule: number,
    password: string
  ): Promise<LoginResponse> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricule, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseAsJson = await response.json();
      return responseAsJson as LoginResponse;
    } catch (error) {
      throw error;
    }
  },
};
