import mongoose, { Schema } from 'mongoose';

const CoinSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    coin: {
        type: Number,
        default: 0
    },
    purpose: String
}, { collection: 'user_coins' }, { timestamps: true });
export default mongoose.model('Coin', CoinSchema);