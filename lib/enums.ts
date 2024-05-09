// enums.ts
export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type RolesResponse = Role[]; // This exports an array of Role objects

export interface SigninRes {
  access_token: string;
  refresh_token: string;
}
