import bcrypt from "bcrypt";
import * as userRepository from "../repositories/user.repository";
import { IUser, TUserRole } from "../types/user";
import { validateUser } from "../utils/validateUser";

// create user
export async function create(data: IUser) {
   // zod validation
   const validatedUser = validateUser(data);

   const { email, password, passwordConfirmation, name, roles } = validatedUser;

   // email collision check
   const user = await userRepository.getOne({ email: data.email });
   if (user) throw new Error("Email already exists");

   // password confirmation check
   if (password !== passwordConfirmation) throw new Error("Passwords don't match");

   // hash password
   data.password = await bcrypt.hash(data.password, 13);

   const newUser = await userRepository.create({ email, password, name, roles: roles as TUserRole });
   return { _id: newUser._id, email: newUser.email, name: newUser.name };
}

// get one user by id
export async function getById(id: string) {
   const user = await userRepository.getOne({ _id: id });

   return user;
}

// get all users
export async function get() {
   const users = await userRepository.get({});

   return users;
}

export async function deleteById(id: string) {
   // Check if user is superadmin
   const checkedUser = await userRepository.getOne({ _id: id });
   if (!checkedUser) {
      return null;
   }

   // Can't delete superadmin
   if (checkedUser.roles == "super-admin") {
      throw new Error("Can not delete superadmin");
   }

   const user = await userRepository.deleteUser(id);

   return user;
}
