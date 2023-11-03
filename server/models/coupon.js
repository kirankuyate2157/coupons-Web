import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
    couponCode: { type: String, required: true },
    discountType: { type: String, required: true },
    discountValue: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    minimumAmount: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    maxUsageCount: { type: Number, required: true },
})
const couponModel = mongoose.model("Coupon", CouponSchema);
export default couponModel;