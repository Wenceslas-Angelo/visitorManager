export type AuthData = {
  name: string;
  firstName: string;
  matricule: string;
  password: string;
};

export type Visitor = {
  name: string;
  firstName: string;
  nationalId: string;
  userId?: string;
  purpose: string;
  startDateTime: Date;
  endDateTime?: Date;
  badgeNumber: number;
};
