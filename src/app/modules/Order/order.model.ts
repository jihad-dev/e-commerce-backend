// models/orderModel.ts
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                qty: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        shippingInfo: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: 'Pending', // or 'Shipped', 'Delivered'
        },
    },
    { timestamps: true }
)

export const Order = mongoose.model('Order', orderSchema)
