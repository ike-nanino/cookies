'use client';

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Confetti from "react-confetti";

function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId")?.trim(); // Trim the one in the URL

  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Handle window size for confetti
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Simulate loading and trigger confetti
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-5xl">❌</div>
          <h1 className="text-xl font-semibold text-gray-800">Invalid Order</h1>
          <p className="text-gray-500">No order ID provided</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={150}
          gravity={0.2}
        />
      )}

      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Confirmed 🎉
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="font-mono text-blue-600 font-semibold">
            #{orderId.slice(6)}
          </p>
          <p className="text-sm text-gray-500 mt-3">Order Date</p>
          <p className="font-semibold">
            {new Date().toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/order"
            className="flex-1 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 text-sm">Processing your order...</p>
          </div>
        </div>
      }
    >
      <OrderSuccessPage />
    </Suspense>
  );
}
