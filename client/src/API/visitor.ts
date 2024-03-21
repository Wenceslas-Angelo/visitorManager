import { API_BASE_URL } from "../config";
import { ReadAllVisitorAPIResponse, VisitorType } from "../types";

export const visitorApi = {
  create: async (
    visitorData: VisitorType,
    token: string
  ): Promise<VisitorType> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${API_BASE_URL}/visitor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(visitorData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseAsJson = await response.json();
      return responseAsJson.visitor as VisitorType;
    } catch (error) {
      throw error;
    }
  },

  readAll: async (
    token: string,
    page = 1
  ): Promise<ReadAllVisitorAPIResponse> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${API_BASE_URL}/visitor?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseAsJson = await response.json();
      return responseAsJson as ReadAllVisitorAPIResponse;
    } catch (error) {
      throw error;
    }
  },
  readAllActive: async (
    token: string,
    page = 1
  ): Promise<ReadAllVisitorAPIResponse> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(
        `${API_BASE_URL}/visitor/active?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseAsJson = await response.json();
      return responseAsJson as ReadAllVisitorAPIResponse;
    } catch (error) {
      throw error;
    }
  },
  updateActiveVisitor: async (
    token: string,
    idVisitor: string
  ): Promise<VisitorType> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(
        `${API_BASE_URL}/visitor/endDateTime/${idVisitor}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseAsJson = await response.json();
      return responseAsJson.visitor as VisitorType;
    } catch (error) {
      throw error;
    }
  },
};
