export type AuthData = {
  name: string;
  firstName: string;
  matricule: number;
  password: string;
};

export type Visitor = {
  name: string;
  firstName: string;
  nationalId: number;
  userId?: string;
  purpose: string;
  startDateTime: Date;
  endDateTime?: Date;
  badgeNumber: number;
};
