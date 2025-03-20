const Wallet = require("../models/Wallet");
const { ethers } = require("ethers");
const Web3 = require("web3");
const secretKey = process.env.SECRET_KEY;


// Create Wallet
const encryptPrivateKey = (privateKey) => {
    const cipher = crypto.createCipher("aes-256-ctr", secretKey);
    let encrypted = cipher.update(privateKey, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};

exports.createWallet = async (req, res) => {
    try {
        const wallet = ethers.Wallet.createRandom();
        
        const newWallet = new Wallet({
            address: wallet.address,
            privateKey: encryptPrivateKey(wallet.privateKey), // Secure Private Key
            mnemonic: wallet.mnemonic.phrase,
            balance: 0,
            importMethod: "generated"
        });

        await newWallet.save();

        const token = jwt.sign({ 
            address: wallet.address, 
            mnemonic: wallet.mnemonic.phrase 
          }, process.env.JWT_SECRET, { expiresIn: "2h" });
      
          res.cookie("walletSession", token, {
            httpOnly: true, // Protect from XSS
            secure: true,   // Only over HTTPS
            sameSite: "Strict"
          });
        res.json({ address: wallet.address, mnemonic: wallet.mnemonic.phrase });
    } catch (error) {
        console.error("Wallet Creation Error:", error);
        res.status(500).json({ error: "Wallet creation failed!" });
    }
};
// Check Balance
exports.getBalance = async (req, res) => {
    try {
        const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_KEY");
        const balance = await web3.eth.getBalance(req.params.address);
        res.json({ balance: web3.utils.fromWei(balance, "ether") });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch balance" });
    }
};

exports.importWalletByPrivateKey = async (req, res) => {
    try {
        const { privateKey } = req.body;
        if (!privateKey) return res.status(400).json({ error: "Private key is required" });

        const wallet = new ethers.Wallet(privateKey);

        const existingWallet = await Wallet.findOne({ address: wallet.address });

        if (existingWallet) {
            return res.json({ message: "Wallet already exists", wallet: existingWallet });
        }

        const newWallet = new Wallet({
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: null, // No mnemonic in this case
            balance: 0,
            importMethod: "privateKey"
        });

        await newWallet.save();
        res.json({ message: "Wallet imported successfully", wallet: newWallet });
    } catch (error) {
        res.status(500).json({ error: "Failed to import wallet" });
    }
};

exports.importWalletByMnemonic = async (req, res) => {
    try {
        const { mnemonic } = req.body;
        if (!mnemonic) return res.status(400).json({ error: "Mnemonic is required" });

        const wallet = ethers.Wallet.fromMnemonic(mnemonic);

        const existingWallet = await Wallet.findOne({ address: wallet.address });

        if (existingWallet) {
            return res.json({ message: "Wallet already exists", wallet: existingWallet });
        }

        const newWallet = new Wallet({
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: mnemonic,
            balance: 0,
            importMethod: "mnemonic"
        });

        await newWallet.save();
        res.json({ message: "Wallet imported successfully", wallet: newWallet });
    } catch (error) {
        res.status(500).json({ error: "Failed to import wallet" });
    }
};

