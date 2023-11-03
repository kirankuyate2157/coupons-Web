import express from "express";
import {
    newCoupon,
    verifyCoupon,
    applyCoupon,
    getCouponData,
    EditCouponData,
} from "../controllers/coupon.controller.js";

const router = express.Router();

router.route("/").post(newCoupon);
router.route("/verify").get(verifyCoupon);
router.route("/apply").post(applyCoupon);
router.route("/:couponCode").get(getCouponData);
router.route("/:couponCode").put(EditCouponData);

export default router;
