import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const NewCoinSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    no_coin: {
        type: Number,
        default: 0
    },
    //pay_method: String,
    ref_code: String
}, { collection: 'user_new_coins' }, { timestamps: true });
NewCoinSchema.plugin(timestamps);
export default mongoose.model('NewCoin', NewCoinSchema);