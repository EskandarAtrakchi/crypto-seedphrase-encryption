"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const encrypt = () => {
    try {
      const encrypted = CryptoJS.AES.encrypt(seedPhrase, password).toString();
      setEncryptedText(encrypted);
      showNotification("Seed phrase encrypted successfully!", "success");
    } catch (error) {
      showNotification("Encryption failed. Please try again.", "error");
    }
  };

  const decrypt = () => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedText, password).toString(
        CryptoJS.enc.Utf8
      );
      if (decrypted) {
        setDecryptedText(decrypted);
        showNotification("Seed phrase decrypted successfully!", "success");
      } else {
        showNotification(
          "Decryption failed. Please check your password.",
          "error"
        );
      }
    } catch {
      showNotification("Decryption failed. Please try again.", "error");
    }
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Seed Phrase Encryption
        </h1>

        <div className="space-y-4">
          <div>
            <Label htmlFor="seedPhrase">Seed Phrase</Label>
            <Input
              id="seedPhrase"
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              placeholder="Enter your seed phrase"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={encrypt} className="flex-1">
              Encrypt
            </Button>
            <Button onClick={decrypt} className="flex-1">
              Decrypt
            </Button>
          </div>

          <div>
            <Label htmlFor="encryptedText">Encrypted Text</Label>
            <Input
              id="encryptedText"
              value={encryptedText}
              onChange={(e) => setEncryptedText(e.target.value)}
              placeholder="Encrypted text will appear here"
            />
          </div>

          <div>
            <Label htmlFor="decryptedText">Decrypted Text</Label>
            <Input
              id="decryptedText"
              value={decryptedText}
              readOnly
              placeholder="Decrypted text will appear here"
            />
          </div>
        </div>

        {notification.show && (
          <Alert
            className={`mt-4 ${
              notification.type === "success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <AlertTitle>
              {notification.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
