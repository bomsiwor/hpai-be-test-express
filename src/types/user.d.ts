export type TUserRole = "admin" | "regular" | "super-admin";

export interface IUser {
   _id?: string;
   name: string;
   email: string;
   password: string;
   passwordConfirmation?: string;
   roles: TUserRole | string;
   deletedAt?: Date | null;
}
