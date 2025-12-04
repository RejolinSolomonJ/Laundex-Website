const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');
const Service = require('../models/Service');
require('dotenv').config({ path: '../.env' });

const checkDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quickwash');
        console.log('Connected to MongoDB...');

        const users = await User.find({});
        console.log('\n--- USERS ---');
        console.table(users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role })));

        const services = await Service.find({});
        console.log('\n--- SERVICES ---');
        console.table(services.map(s => ({ id: s._id, name: s.name, price: s.price })));

        const orders = await Order.find({});
        console.log('\n--- ORDERS ---');
        console.table(orders.map(o => ({ id: o._id, user: o.user, status: o.status, amount: o.totalAmount })));

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

checkDb();
