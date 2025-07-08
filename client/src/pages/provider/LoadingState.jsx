import { motion } from "framer-motion";

export default function LoadingState({ darkMode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`w-12 h-12 border-4 ${
          darkMode ? "border-purple-400" : "border-purple-500"
        } border-t-transparent rounded-full`}
      />
    </div>
  );
}
