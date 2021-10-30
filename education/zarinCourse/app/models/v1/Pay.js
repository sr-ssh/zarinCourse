let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Pay = new Schema({
    active: { type: Boolean, default: true },
    // user: { type: Schema.Types.ObjectId, ref: 'Customer' },
    paid: { type: Boolean, default: false },
    authority: { type: String, unique: true, sparse: true },
    amount: { type: Number }
});

Pay.plugin(timestamps);

module.exports = mongoose.model('Pay', Pay);