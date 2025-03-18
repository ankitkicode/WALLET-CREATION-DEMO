import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const MnemonicPage = () => {
    const location = useLocation();
    const mnemonic = location.state?.mnemonic || "";
    const wallet = location.state?.wallet || null;
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(mnemonic).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Message 2 sec me hide ho jayega
        }).catch(err => console.error("Copy failed:", err));
    };

    return (
        <div className="w-80 bg-gray-900 text-white p-5 shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">Your Mnemonic Phrase</h3>
            
            {mnemonic ? (
                <div className="bg-gray-800 p-4 rounded-lg text-sm">
                           <div className="grid grid-cols-2 gap-2">
                        {mnemonic.split(" ").map((word, index) => (
                            <div key={index} className="py-1">
                                <span className="font-semibold">{index + 1}.</span> {word}
                            </div>
                        ))}
                    </div>

                    {/* Copy Button */}
                    <button 
                        onClick={copyToClipboard} 
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                    >
                        {copied ? "✅ Copied!" : "📋 Copy Mnemonic"}
                    </button>

                </div>
            ) : (
                <p className="text-center">No Mnemonic Found!</p>
            )}

            {/* Back Button */}
            <Link to="/dashboard"   state={{ wallet }}  className="block text-center mt-4 text-blue-400 hover:text-blue-300">
             Go to Wallet
            </Link>
        </div>
    );
};

export default MnemonicPage;
