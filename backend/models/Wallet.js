const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
    privateKey: { type: String, required: true },  
    mnemonic: { type: String, default: null },  // Store mnemonic if available
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    importMethod: { 
        type: String, 
        enum: ["generated", "privateKey", "mnemonic"], 
        required: true 
    } // To track import method
});

module.exports = mongoose.model("Wallet", walletSchema);
