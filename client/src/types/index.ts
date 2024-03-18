export type AuthType = {
  name: string;
  firstName: string;
  matricule: string;
  password: string;
};

export type VisitorType = {
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
};
