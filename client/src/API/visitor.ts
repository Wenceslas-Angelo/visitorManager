import { API_BASE_URL } from "../config";
import { ReadAllVisitorsResponse, VisitorFilters, VisitorType } from "../types";

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
    dateQuery: string,
    todayQuery: boolean,
    inTodayQuery: boolean,
    outTodayQuery: boolean
  ): Promise<ReadAllVisitorsResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/visitor?page=${page}&search=${searchQuery}&purpose=${purposeQuery}&date=${dateQuery}&today=${todayQuery}&inToday=${inTodayQuery}&outToday=${outTodayQuery}`,
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
