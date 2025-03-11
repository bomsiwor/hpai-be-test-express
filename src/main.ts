import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import { connectDb } from "./utils/connectDb";
import { authRouter } from "./routes/auth.route";
import { authMiddleware } from "./middleware/auth.middleware";

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

app.use(authMiddleware);

connectDb();

app.listen(process.env.PORT, () => {
   // eslint-disable-next-line @/no-console
   console.log(`Server running on port ${process.env.PORT}`);
});
