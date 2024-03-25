import { API_BASE_URL } from "../config";
import {
  CreateVisitorAPIResponse,
  VisitorAPIResponse,
  VisitorType,
} from "../types";

export const visitorApi = {
  create: async (
    visitorData: VisitorType,
    token: string
  ): Promise<CreateVisitorAPIResponse> => {
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

    return (await response.json()) as CreateVisitorAPIResponse;
  },

  readAll: async (token: string, page = 1): Promise<VisitorAPIResponse> => {
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

  readAllActive: async (
    token: string,
    page = 1
  ): Promise<VisitorAPIResponse> => {
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
    return responseAsJson as VisitorAPIResponse;
  },
  updateActiveVisitor: async (
    token: string,
    idVisitor: string
  ): Promise<VisitorType> => {
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
  },
};
