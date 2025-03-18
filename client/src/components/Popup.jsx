import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Popup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const createWallet = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:5000/create-wallet", { method: "POST" });
            const data = await res.json();

            if (data && data.mnemonic && data.address) {
                navigate("/mnemonic", { state: { mnemonic: data.mnemonic, wallet: data } });
            } else {
                setError("Wallet creation failed. Try again!");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="w-88 h-76 flex flex-col justify-center gap-10 bg-gray-900 text-white p-5  shadow-lg">
           <div>
           <motion.h3 
                className="text-xl font-semibold text-center mb-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                A-Wallet 🚀
            </motion.h3>
            <p className="text-center text-gray-400">
                Welcome to A-Wallet. Click the button below to create a new wallet.
            </p>
           </div>

            {error && <p className="text-red-400 text-center mb-2">{error}</p>}

            <motion.button 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200 ease-in-out"
                onClick={createWallet}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Wallet"}
            </motion.button>
        </div>
    );
};

export default Popup;
