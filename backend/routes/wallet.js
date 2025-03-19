const express = require("express");
const { 
    createWallet, 
    importWalletByPrivateKey, 
    importWalletByMnemonic 
} = require("../controllers/walletController");

const router = express.Router();

router.post("/create-wallet", createWallet);
router.post("/import-wallet/private-key", importWalletByPrivateKey);
router.post("/import-wallet/mnemonic", importWalletByMnemonic);

module.exports = router;
