console.log("Web3 Wallet Extension Injected!");

window.addEventListener("message", async (event) => {
    if (event.data.type === "GET_WALLET_ADDRESS") {
        window.postMessage({ type: "WALLET_ADDRESS", address: "0xYourWalletAddress" }, "*");
    }
});
