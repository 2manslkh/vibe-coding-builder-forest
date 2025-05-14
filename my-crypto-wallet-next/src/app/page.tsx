"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function HomePage() {
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Example address
  const balance = "0.00 ETH"; // Example balance
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSendCrypto = async () => {
    if (!recipientAddress || !amount) {
      alert("Please enter recipient address and amount.");
      return;
    }
    // We\'\'\'ll implement actual sending logic here later
    alert(`Attempting to send ${amount} ETH to ${recipientAddress}`);
    // For now, just log to console
    console.log("Recipient:", recipientAddress);
    console.log("Amount:", amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 font-sans">
      <header className="w-full max-w-2xl mb-12">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          My Crypto Wallet
        </h1>
      </header>

      <main className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">
        <section id="wallet-overview" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Wallet Overview
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p id="balance" className="text-lg font-medium text-gray-800">
                {balance}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p
                id="wallet-address"
                className="text-lg font-medium text-gray-800 break-all"
              >
                {walletAddress}
              </p>
            </div>
          </div>
        </section>

        <section id="actions">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Actions</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient-address">Recipient Address</Label>
              <Input
                id="recipient-address"
                type="text"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRecipientAddress(e.target.value)
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
                className="w-full"
              />
            </div>
            <div className="flex space-x-4">
              <Button
                id="send-btn"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex-1"
                onClick={handleSendCrypto}
              >
                Send
              </Button>
              <Button
                id="receive-btn"
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
                onClick={() =>
                  alert(`Your wallet address is: ${walletAddress}`)
                }
              >
                Receive
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full max-w-2xl mt-12 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Wallet
        </p>
      </footer>
    </div>
  );
}
