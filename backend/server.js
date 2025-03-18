const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Wallet Schema
const Wallet = mongoose.model("Wallet", {
    address: String,
    privateKey: String,  // Encrypt this before storing
    balance: Number
});

// Create Wallet API
app.post("/create-wallet", async (req, res) => {
    const { ethers } = require("ethers");
    const wallet = ethers.Wallet.createRandom();
    
    const newWallet = new Wallet({
        address: wallet.address,
        privateKey: wallet.privateKey,  
        balance: 0
    });

    await newWallet.save();
    res.json({ address: wallet.address, mnemonic: wallet.mnemonic.phrase });
});

// Check Balance API
app.get("/balance/:address", async (req, res) => {
    const { Web3 } = require("web3");
    const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_KEY");
    
    const balance = await web3.eth.getBalance(req.params.address);
    res.json({ balance: web3.utils.fromWei(balance, "ether") });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
