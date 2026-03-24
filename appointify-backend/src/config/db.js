import mongoose from "mongoose";

export const connect = async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("db connected successfully..");
  } catch (error) {
    console.log("error while connecting..", error);
  }
};
