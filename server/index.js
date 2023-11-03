import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // accessing  .env data

import userRouter from "./routes/user.routes.js";
import couponRouter from "./routes/coupon.routes.js";

const app = express();
app.use(cors()); // api security enhancing  purpose..

app.get("/", (req, res) => {
    res.send({ message: "Hello World ! my name is kiran.dev" }); //route response on root
});


//using middleware  "kkcoupon/api/v1/users"

app.use("/kkcoupon/api/v1/users", userRouter);
app.use("/kkcoupon/api/v1/coupons", couponRouter);


//server port and connection
const StartServer = async () => {
    try {
        //connect to data base via URL
        mongoose.set("strictQuery", true);
        mongoose
            .connect(process.env.MONGODB_URL)
            .then(() => console.log("Connected to DB 🪖..."))
            .catch((error) => console.log(console.log(error)));
        app.listen(8080, () =>
            console.log("server started 🚀.. on port http://localhost:8080")
        );
    } catch (err) {
        console.log(err);
    }
};

StartServer();
