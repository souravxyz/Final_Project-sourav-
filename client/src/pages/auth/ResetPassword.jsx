import { useForm } from "react-hook-form";
import { useResetPasswordWithToken } from "../../hooks/auth/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function ResetPassword() {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const resetPasswordMutation = useResetPasswordWithToken();
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Particle background effect
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
      }));
      setParticles(newParticles);
    };

    generateParticles();

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.speedX) % 100,
          y: (p.y + p.speedY) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data) => {
    resetPasswordMutation.mutate(
      { token, newPassword: data.password },
      {
        onSuccess: () => {
          setShowConfetti(true);
          toast.success(
            <div>
              <div className="font-bold">Password Reset Successful!</div>
              <div className="text-sm">
                You can now login with your new password
              </div>
            </div>,
            {
              icon: "🔑",
              className:
                "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
              autoClose: 3000,
            }
          );
          setTimeout(() => navigate("/login"), 3500);
        },
        onError: (error) => {
          toast.error(
            <div>
              <div className="font-bold">Reset Failed</div>
              <div className="text-sm">
                {error?.response?.data?.message || "Something went wrong!"}
              </div>
            </div>,
            {
              icon: "❌",
              className: "bg-gradient-to-r from-red-500 to-rose-600 text-white",
            }
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-95"></div>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: 0.7,
              transform: `scale(${
                Math.sin(Date.now() / 1000 + particle.id) * 0.3 + 0.7
              })`,
            }}
          />
        ))}
      </div>

      {/* Confetti celebration */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          colors={["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"]}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700 border-opacity-60">
          <div className="p-8">
            {/* Back button */}
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ x: -4 }}
              className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </motion.button>

            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <FaLock className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                New Password
              </h2>
              <p className="text-gray-400">Create a strong new password</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="New Password"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-70 border ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300`}
                />
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 pl-2"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  type="submit"
                  disabled={resetPasswordMutation.isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  {resetPasswordMutation.isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    "Set New Password"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
