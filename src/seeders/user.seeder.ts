/* eslint-disable @/no-console */
import mongoose from "mongoose";
import { User } from "../models/user.model";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { IUser } from "../types/user";

const seedUsers = async () => {
   dotenv.config();
   try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log("Connected to MongoDB");

      // Predefined email for seed
      const email = "admin@mail.com";

      // If user already exists
      // Don't seed user again
      // This ensure onluy one superadmin
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
         // await User.deleteMany({});
         console.log("User superadmin already exists");
         process.exit(0);
      }

      // Define seed users
      const users: IUser = {
         email,
         password: await bcrypt.hash("Admin1234!", 8), // Will be hashed in pre-save hook if set up
         name: "Admin User",
         roles: "super-admin",
      };
      // Insert users
      const createdUser = await User.create(users);
      console.log("Users seeded successfully", createdUser);

      // Disconnect
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");

      process.exit(0);
   } catch (error) {
      console.error("Error seeding users:", error);
      process.exit(1);
   }
};

// Run the seeder
seedUsers();
