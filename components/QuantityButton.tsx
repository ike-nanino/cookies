"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function QuantityButton() {
  const [count, setCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  // Get button width so badge slides exactly that far
  useLayoutEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="relative flex items-center">
      <AnimatePresence initial={false}>
        {count > 0 && (
          <motion.div
            key="count-badge"
            initial={{ x: buttonWidth, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: buttonWidth, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-0 px-2 py-1 rounded-full bg-emerald-500 text-white text-sm font-bold shadow-lg z-10"
          >
            {count}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plus button */}
      <button
        ref={buttonRef}
        onClick={() => setCount(count + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg relative z-20"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* Minus button for demo */}
      <button
        onClick={() => setCount(Math.max(0, count - 1))}
        className="ml-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        -
      </button>
    </div>
  );
}
