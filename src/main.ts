import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDb } from "./utils/connectDb";
import { authRouter } from "./routes/auth.route";
import { userRouter } from "./routes/user.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      credentials: true,
      origin: (requestOrigin, callback) => {
         if (requestOrigin) {
            callback(null, requestOrigin);
         } else {
            callback(null, "*");
         }
      },
      methods: "*",
   }),
);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

connectDb();

app.listen(process.env.PORT, () => {
   // eslint-disable-next-line @/no-console
   console.log(`Server running on port ${process.env.PORT}`);
});
