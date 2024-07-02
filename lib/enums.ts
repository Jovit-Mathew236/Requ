export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type RolesResponse = Role[]; // This exports an array of Role objects

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  roleId: number;
  departmentId: number;
  collegeId: number;
  createdAt: string;
  updatedAt: string;
}

export type UserResponse = User[]; // This exports an array of user objects

export interface Form {
  id: number;
  fromId: number;
  toId: number;
  email: string;
  title: string;
  replay: string;
  message: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FormResponse = Form[]; // This exports an array of Role objects
