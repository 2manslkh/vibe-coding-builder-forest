"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { createWalletClient, custom, parseEther, WalletClient } from "viem";
import { mainnet } from "viem/chains";

// It's good practice to define a type for your wallet client if possible,
// though `any` can be a starting point.
// For window.ethereum, you might need to declare it globally or cast:
declare global {
  interface Window {
    ethereum?: any; // You can replace `any` with a more specific EIP-1193 provider type if available
  }
}

export default function HomePage() {
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  // Placeholder for balance - fetching real balance is a next step
  const [balance, setBalance] = useState("0.00 ETH");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const client = createWalletClient({
        chain: mainnet, // Configure for your target chain
        transport: custom(window.ethereum),
      });
      setWalletClient(client);
    }
  }, []);

  const connectWallet = async () => {
    if (!walletClient) {
      alert(
        "Wallet provider (e.g., MetaMask) not found or not initialized. Please ensure it's installed and this page is loaded correctly."
      );
      return;
    }
    try {
      const accounts = await walletClient.requestAddresses();
      if (accounts && accounts.length > 0) {
        setConnectedAccount(accounts[0]);
        // TODO: Fetch and display actual balance for connectedAccount
      } else {
        alert(
          "No accounts found. Please make sure your wallet is unlocked and you've granted permission."
        );
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Check the console for details.");
    }
  };

  const handleSendCrypto = async () => {
    if (!connectedAccount) {
      alert("Please connect your wallet first.");
      return;
    }
    if (!recipientAddress || !amount) {
      alert("Please enter a recipient address and an amount.");
      return;
    }
    if (!walletClient) {
      alert("Wallet client is not available. Cannot send transaction.");
      return;
    }

    try {
      // This is a placeholder alert.
      // The actual transaction would be initiated below.
      alert(
        `Preparing to send ${amount} ETH to ${recipientAddress} from ${connectedAccount}.`
      );

      // Uncomment and adapt the following to send a real transaction:
      /*
      const txHash = await walletClient.sendTransaction({
        account: connectedAccount as `0x${string}`, // Ensure account is in the correct format
        to: recipientAddress as `0x${string}`,       // Ensure recipientAddress is in the correct format
        value: parseEther(amount),                // Convert ETH amount to wei
        // chain: mainnet, // ensure the chain is correctly specified if not default to client's chain
      });
      console.log("Transaction hash:", txHash);
      alert(`Transaction sent! Hash: ${txHash}`);
      setRecipientAddress(""); // Clear input fields
      setAmount("");
      // TODO: Update balance after transaction
      */
      console.log("Placeholder: Send crypto action triggered.");
      console.log(
        "Recipient:",
        recipientAddress,
        "Amount:",
        amount,
        "Sender:",
        connectedAccount
      );
    } catch (error) {
      console.error("Error sending crypto:", error);
      // It's helpful to provide more specific error messages if possible
      let message = "Failed to send crypto. ";
      if (error instanceof Error) {
        if (error.message.includes("User rejected the request")) {
          message += "Transaction was rejected by the user.";
        } else if (error.message.includes("insufficient funds")) {
          message += "Insufficient funds for the transaction.";
        } else {
          message += "Please check the console for more details.";
        }
      }
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 font-sans">
      <header className="w-full max-w-2xl mb-12 flex justify-between items-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
          My Crypto Wallet
        </h1>
        {connectedAccount ? (
          <div className="text-sm text-gray-700">
            <p>
              Connected:{" "}
              {`${connectedAccount.substring(
                0,
                6
              )}...${connectedAccount.substring(connectedAccount.length - 4)}`}
            </p>
          </div>
        ) : (
          <Button onClick={connectWallet} variant="outline">
            Connect Wallet
          </Button>
        )}
      </header>

      <main className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 md:p-8">
        <section id="wallet-overview" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Wallet Overview
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p id="balance" className="text-lg font-medium text-gray-800">
                {balance} {/* TODO: Display actual balance here */}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Address</p>
              <p
                id="wallet-address"
                className="text-lg font-medium text-gray-800 break-all"
              >
                {connectedAccount ? connectedAccount : "N/A - Connect Wallet"}
              </p>
            </div>
          </div>
        </section>

        <section id="actions">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Actions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient-address" className="text-gray-600">
                Recipient Address
              </Label>
              <Input
                id="recipient-address"
                type="text"
                placeholder="e.g., 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
                value={recipientAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRecipientAddress(e.target.value)
                }
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={!connectedAccount}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-600">
                Amount (ETH)
              </Label>
              <Input
                id="amount"
                type="text" // Using "text" for now, consider "number" with validation
                placeholder="e.g., 0.01"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={!connectedAccount}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button
                id="send-btn"
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50"
                onClick={handleSendCrypto}
                disabled={!connectedAccount || !recipientAddress || !amount}
              >
                Send Crypto
              </Button>
              <Button
                id="receive-btn"
                variant="outline"
                className="w-full sm:w-auto border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50"
                onClick={() =>
                  alert(
                    `Your wallet address is: ${
                      connectedAccount
                        ? connectedAccount
                        : "Please connect your wallet first."
                    }`
                  )
                }
                disabled={!connectedAccount}
              >
                Show My Address
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full max-w-2xl mt-12 text-center">
        <p className_FIRST_LINE_MARKER="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Crypto Wallet
        </p>
      </footer>
    </div>
  );
}
