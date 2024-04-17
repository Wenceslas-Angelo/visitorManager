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

  readAllVisitors: async (
    token: string,
    page: number
  ): Promise<VisitorAPIResponse> => {
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
    return responseAsJson as VisitorAPIResponse;
  },

  delete: async (
    token: string,
    idVisitor: string
  ): Promise<VisitorAPIResponse> => {
    const response = await fetch(`${API_BASE_URL}/visitor/${idVisitor}`, {
      method: "DELETE",
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

  update: async (
    visitorData: VisitorType,
    token: string,
    visitorId: string
  ): Promise<VisitorType> => {
    const response = await fetch(`${API_BASE_URL}/visitor/${visitorId}`, {
      method: "PUT",
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
  },
};
