export enum UserType {
  None = 0,
}
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  type: UserType;
  ambassadorId?: number;
  companyId?: number;
  countryId: number;
}
