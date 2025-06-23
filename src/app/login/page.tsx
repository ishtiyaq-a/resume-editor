"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const forgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login to Resume Editor</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginWithEmail}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login with Email
        </button>

        <button
          onClick={signUpWithEmail}
          className="w-full bg-gray-700 text-white py-2 rounded"
        >
          Sign Up
        </button>

        <button
          onClick={loginWithGoogle}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Sign in with Google
        </button>

        <button
          onClick={forgotPassword}
          className="w-full text-blue-600 underline text-sm"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}
