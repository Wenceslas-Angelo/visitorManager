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

export type VisitorAPIResponse = {
  totalPages: number;
  totalResults: number;
  results: VisitorType[];
  page: number;
};

export type CreateVisitorAPIResponse = {
  totalPages: number;
  totalResults: number;
  result: VisitorType;
};
