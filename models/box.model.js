const mongoose = require('mongoose');
const boxSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'The box adress is required']
    },
    name: {
        type: String,
        required: [true, 'The box name is required']
    },
        contact: {
        type: String,
        required: [true, 'The box contact is required']
    },
    image: {
        type: String,
        default: ''
    },
    reviews: {
        type: [String],
        default: []
    }
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
 });

 const Box = mongoose.model('Box', boxSchema);
 module.exports = Box;
