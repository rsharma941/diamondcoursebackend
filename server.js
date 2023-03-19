import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import RazorPay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";
import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
await connectDB();

cloudinary.v2.config({
  cloud_name: 'dtucla9es',
  api_key: '767132571424227',
  api_secret: 'oC1WUeeEC9-QH9VcUaOUImROZPg',
  secure: true,
});
  
export const instance = new RazorPay({
  key_id:'rzp_test_3o6r2ZMmGiQeyp',
  key_secret:'PIg74Uq8UZdThKxQhJq6QvNA',
});

nodeCron.schedule("0 0 0 5 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port: ${process.env.PORT}`);
});
