const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, // URL or placeholder
        default: 'https://via.placeholder.com/150'
    },
    category: {
        type: String,
        enum: ['wash', 'dryclean', 'iron', 'premium'],
        default: 'wash'
    }
});

module.exports = mongoose.model('Service', ServiceSchema);
