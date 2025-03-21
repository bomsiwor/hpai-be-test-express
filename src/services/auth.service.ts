import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository";
import * as authRepository from "../repositories/auth.repository";

// login
export async function login(data: { email: string; password: string }) {
   const { email, password } = data;
   const user = await userRepository.getOne({ email });

   // user not found
   if (!user) throw new Error("authentication failed");

   // password not match
   const isMatch = await bcrypt.compare(password, user.password as string);

   if (!isMatch) throw new Error("authentication failed. Check your email or password");

   // create accessToken & refreshToken
   const payload = {
      userId: user._id,
   };

   const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY as string, {
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
   });
   const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY as string, {
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
   });

   // save refreshToken to database
   await authRepository.create({ userId: user._id.toString(), refreshToken });

   return { user: { _id: user._id, name: user.name, email: user.email, role: user.roles }, accessToken, refreshToken };
}

// logout
export async function logout(refreshToken: string) {
   await authRepository.deleteToken({ refreshToken });

   return;
}

// authorize
export async function authorize(data: { accessToken?: string; refreshToken?: string }) {
   const { accessToken, refreshToken } = data;

   // accessToken not found
   if (!accessToken) throw new Error("accessToken not found");

   try {
      const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string) as {
         userId: string;
      };

      return { userId: payload.userId };
   } catch (_error) {
      // accessToken is invalid

      // refreshToken not found
      if (!refreshToken) throw new Error("refreshToken not found");

      // check refreshToken
      const existingRefreshToken = await authRepository.getOne({ refreshToken });

      //   refresh token not found in db
      if (!existingRefreshToken) throw new Error("accessToken is invalid");

      try {
         const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as string) as {
            userId: string;
         };
         const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY as string, {
            expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
         });
         return { userId: payload.userId, accessToken: newAccessToken };
      } catch (_error) {
         throw new Error("refreshToken is invalid");
      }
   }
}
