export type AuthType = {
  name: string;
  firstName: string;
  matricule: number;
  password: string;
};

export type VisitorType = {
  _id: string;
  name: string;
  firstName: string;
  nationalId: string;
  userId?: string;
  purpose: string;
  startDateTime: Date;
  endDateTime?: Date;
  badgeNumber: number;
};

export type ReadAllVisitorsResponse = {
  visitors: VisitorType[];
  totalVisitors: number;
  totalPages?: number;
  currentPage?: number;
};

export type SignUpResponse = {
  message: string;
};

export type LoginResponse = {
  userId: string;
  token: string;
  name: string;
  firstName: string;
  matricule: number;
};
