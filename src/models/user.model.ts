import { Schema, model } from "mongoose";

const userSchema = new Schema({
   name: String,
   email: String,
   password: String,
   roles: String,
   deletedAt: { type: Date, default: null },
});

export const User = model("User", userSchema);
