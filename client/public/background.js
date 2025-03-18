chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendTransaction") {
        console.log("Sending Transaction:", request.data);
        sendResponse({ status: "Transaction Sent!" });
    }
});
