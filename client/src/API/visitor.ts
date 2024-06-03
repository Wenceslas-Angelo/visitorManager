import { API_BASE_URL } from "../config";
import { ReadAllVisitorsResponse, VisitorType } from "../types";

export const visitorApi = {
  create: async (
    visitorData: VisitorType,
    token: string
  ): Promise<VisitorType> => {
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
    page: number,
    searchQuery: string,
    purposeQuery: string,
    date: string
  ): Promise<ReadAllVisitorsResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/visitor?page=${page}&search=${searchQuery}&purpose=${purposeQuery}&date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }

    const responseAsJson = await response.json();
    return responseAsJson as ReadAllVisitorsResponse;
  },

  readAllVisitorsToday: async (
    token: string,
    searchQuery: string,
    purposeQuery: string
  ): Promise<ReadAllVisitorsResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/visitor/today?search=${searchQuery}&purpose=${purposeQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }

    const responseAsJson = await response.json();
    return responseAsJson as ReadAllVisitorsResponse;
  },

  delete: async (token: string, idVisitor: string): Promise<VisitorType> => {
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
    return responseAsJson.visitor as VisitorType;
  },

  readOne: async (token: string, idVisitor: string): Promise<VisitorType> => {
    const response = await fetch(`${API_BASE_URL}/visitor/${idVisitor}`, {
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
    return responseAsJson.visitor as VisitorType;
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
