import { API_BASE_URL } from "../config";
import { VisitorAPIResponse, VisitorType } from "../types";

export const visitorApi = {
  create: async (
    visitorData: VisitorType,
    token: string
  ): Promise<VisitorAPIResponse> => {
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

    return (await response.json()) as VisitorAPIResponse;
  },

  readAllToday: async (token: string): Promise<VisitorAPIResponse> => {
    const response = await fetch(`${API_BASE_URL}/visitor/today`, {
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
    return responseAsJson as VisitorAPIResponse;
  },

  readAllOutToday: async (token: string): Promise<VisitorAPIResponse> => {
    const response = await fetch(`${API_BASE_URL}/visitor/today/out`, {
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
    return responseAsJson as VisitorAPIResponse;
  },

  readAllInToday: async (token: string): Promise<VisitorAPIResponse> => {
    const response = await fetch(`${API_BASE_URL}/visitor/today/in`, {
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
    return responseAsJson as VisitorAPIResponse;
  },

  checkOut: async (token: string, idVisitor: string): Promise<VisitorType> => {
    const response = await fetch(
      `${API_BASE_URL}/visitor/checkout/${idVisitor}`,
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
  },
};
