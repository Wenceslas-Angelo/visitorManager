import { API_BASE_URL } from "../config";
import { VisitorFilters, VisitorType } from "../types";

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

  readAllVisitors: async (token: string): Promise<VisitorType[]> => {
    const response = await fetch(`${API_BASE_URL}/visitor`, {
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
    return responseAsJson.visitors as VisitorType[];
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

  search: async (
    token: string,
    filters: VisitorFilters
  ): Promise<VisitorType[]> => {
    let queryString = `?`;
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        queryString += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    }
    const response = await fetch(`${API_BASE_URL}/visitor${queryString}`, {
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
    return responseAsJson as VisitorType[];
  },
};
