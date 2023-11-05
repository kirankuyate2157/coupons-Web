import express from "express";
import {
    newCoupon,
    verifyCoupon,
    applyCoupon,
    getCouponData,
    EditCouponData,
    getAllCoupons,
    verifyCoupon2, applyCoupon2

} from "../controllers/coupon.controller.js";

const router = express.Router();

router.route("/").post(newCoupon);
router.route("/getall").get(getAllCoupons);
router.route("/verify").get(verifyCoupon);
router.route("/verify/:couponCode/:orderTotal").get(verifyCoupon2);
router.route("/apply/:couponCode/:orderTotal").post(applyCoupon2);
router.route("/apply").post(applyCoupon);
router.route("/:couponCode").get(getCouponData);
router.route("/:couponCode").put(EditCouponData);

export default router;
