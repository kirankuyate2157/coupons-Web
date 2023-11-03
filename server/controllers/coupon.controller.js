import Coupon from "../models/coupon.js"

// Create a new coupon ✅ ref not wrk instead str
const newCoupon = async (req, res) => {
    try {
        if (req.body) {
            console.log("body of copon ", req.body)
        } else {
            console.log("no body of copon..");
        }
        const newCoupon = await Coupon.create(req.body);
        console.log(newCoupon, req.body);
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(400).json({ error: 'Coupon creation failed', message: error.message });
    }
};
// check coupun status  is valid the return discount  ✅
const verifyCoupon = async (req, res) => {
    try {
        const { couponCode, orderTotal } = req.body;
        const coupon = await Coupon.findOne({ couponCode });
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }

        const currentDate = new Date();
        if (currentDate > coupon.expirationDate) {
            return res.status(400).json({ error: 'Coupon is expired' });
        }
        if (coupon.maxUsageCount <= 0) {
            return res.status(400).json({ error: 'Coupon has reached its maximum usage limit' });
        }

        if (orderTotal < coupon.minimumAmount) {
            return res.status(400).json({ error: `Minimum order amount ${coupon.minimumAmount} criteria not met` });
        }

        // If maxUsageCount is greater than 0, decrement it.
        // if (coupon.maxUsageCount > 0) {
        //     coupon.maxUsageCount--;
        //     await coupon.save();
        // }

        let appliedDiscount = 0;
        if (coupon.discountType === 'percentage') {
            appliedDiscount = (coupon.discountValue / 100) * orderTotal;
        } else if (coupon.discountType === 'fixed') {
            appliedDiscount = coupon.discountValue;
        }

        res.json({ appliedDiscount });
    } catch (error) {
        res.status(500).json({ error: 'Coupon verification failed' });
    }
};
// Apply a coupon ✅
const applyCoupon = async (req, res) => {
    try {
        const { couponCode, orderTotal } = req.body;
        const coupon = await Coupon.findOne({ couponCode });
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        } else {
            console.log("coupon data : ", coupon, "body : ", req.body)
        }

        const currentDate = new Date();
        if (currentDate > coupon.expirationDate) {
            return res.status(400).json({ error: 'Coupon is expired' });
        }

        if (coupon.maxUsageCount <= 0) {
            return res.status(400).json({ error: 'Coupon has reached its maximum usage limit' });
        }

        if (orderTotal < coupon.minimumAmount) {
            return res.status(400).json({ error: 'Minimum order amount criteria not met' });
        }

        if (coupon.maxUsageCount > 0) {
            coupon.maxUsageCount--;
            await coupon.save();
        }

        let appliedDiscount = 0;
        if (coupon.discountType === 'percentage') {
            appliedDiscount = (coupon.discountValue / 100) * orderTotal;
        } else if (coupon.discountType === 'fixed') {
            appliedDiscount = coupon.discountValue;
        }

        res.json({ appliedDiscount });
    } catch (error) {
        res.status(500).json({ error: 'Coupon application failed' });
    }
};

// Get coupon data based on coupon code ✅
const getCouponData = async (req, res) => {
    const couponCode = req.params.couponCode;
    try {
        const coupon = await Coupon.findOne({ couponCode });
        if (coupon) {
            res.json(coupon);
        } else {
            res.status(404).json({ error: 'Coupon not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving coupon data' });
    }
};

// Edit coupon data ✅
const EditCouponData = async (req, res) => {
    const couponCode = req.params.couponCode;
    try {
        const updatedCoupon = await Coupon.findOneAndUpdate(
            { couponCode },
            req.body,
            { new: true } // Return the updated coupon
        );

        if (updatedCoupon) {
            res.json(updatedCoupon);
        } else {
            res.status(404).json({ error: 'Coupon not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Coupon update failed' });
    }
};

export { EditCouponData, newCoupon, getCouponData, applyCoupon, verifyCoupon };
