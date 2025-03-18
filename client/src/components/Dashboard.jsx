import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
    const wallet = location.state?.wallet || null;
    const [balance, setBalance] = useState("0.00 ETH");
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (wallet) {
            fetchBalance(wallet.address);
            fetchTransactions(wallet.address);
        }
    }, [wallet]);

    const fetchBalance = async (address) => {
        // API Call to Get Balance (Replace with actual API)
        setBalance("1.23 ETH"); // Dummy Balance
    };

    const fetchTransactions = async (address) => {
        // API Call to Get Transactions (Replace with actual API)
        setTransactions([
            { id: "1", type: "Sent", amount: "0.1 ETH", to: "0xabc...123", date: "2024-03-18" },
            { id: "2", type: "Received", amount: "0.5 ETH", from: "0xdef...456", date: "2024-03-17" },
        ]);
    };

    return (
        <div className="w-96 bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">🚀 Wallet Dashboard</h2>

            {wallet ? (
                <div className="bg-gray-800 p-4 rounded-lg text-sm">
                    <p className="mb-2"><strong>🪪 Address:</strong> {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
                    <p className="mb-4"><strong>💰 Balance:</strong> {balance}</p>

                    {/* Send & Receive Buttons */}
                    <div className="flex justify-between mt-4">
                        <button className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg">⬆ Send</button>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">⬇ Receive</button>
                    </div>

                    {/* Transactions */}
                    <h3 className="mt-6 text-lg font-semibold">📜 Recent Transactions</h3>
                    <ul className="mt-2 text-sm">
                        {transactions.length > 0 ? (
                            transactions.map((tx) => (
                                <li key={tx.id} className="bg-gray-700 p-2 my-1 rounded-lg">
                                    <span className="font-semibold">{tx.type}</span>: {tx.amount}  
                                    {tx.type === "Sent" ? ` to ${tx.to}` : ` from ${tx.from}`}
                                    <span className="block text-xs text-gray-400">{tx.date}</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-400">No transactions found</p>
                        )}
                    </ul>
                </div>
            ) : (
                <p className="text-center">No Wallet Found!</p>
            )}

            {/* Back Button */}
            <Link to="/" className="block text-center mt-4 text-blue-400 hover:text-blue-300">
                ⬅ Back to Home
            </Link>
        </div>
    );
};

export default Dashboard;
