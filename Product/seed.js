const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String
});

const Product = mongoose.model('Product', productSchema);

async function checkProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Product.countDocuments();
        console.log(`Current product count: ${count}`);
        if (count === 0) {
            console.log('Database is empty. Seeding...');
            const products = require('../products.json');
            // Remove $oid from _id if present to let Mongo generate IDs or use them as strings
            const formattedProducts = products.map(p => {
                const { _id, ...rest } = p;
                return rest;
            });
            await Product.insertMany(formattedProducts);
            console.log('Seeding completed.');
        }
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkProducts();
