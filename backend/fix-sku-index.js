require("dotenv").config();
const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI. Set it in backend/.env before running this script.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    console.log("Connected to MongoDB");
    
    try {
        // Get the products collection
        const db = mongoose.connection.db;
        const collection = db.collection('products');
        
        // List all indexes
        const indexes = await collection.indexes();
        console.log("Current indexes:", indexes);
        
        // Check if sku_1 index exists
        const skuIndex = indexes.find(index => index.name === 'sku_1');
        if (skuIndex) {
            console.log("Found sku_1 index, dropping it...");
            await collection.dropIndex('sku_1');
            console.log("Successfully dropped sku_1 index");
        } else {
            console.log("No sku_1 index found");
        }
        
        // List indexes after removal
        const updatedIndexes = await collection.indexes();
        console.log("Updated indexes:", updatedIndexes);
        
    } catch (error) {
        console.error("Error fixing index:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
})
.catch(err => {
    console.error("Failed to connect to MongoDB", err);
});
