import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const { register, handleSubmit, reset, watch } = useForm();
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState([]);

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
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (data.profilePic && data.profilePic[0]) {
      formData.append("profilePic", data.profilePic[0]);
    }

    registerMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(
          <div>
            <div className="font-bold">Registration Successful!</div>
            <div className="text-sm">
              Welcome to our platform. Redirecting to login...
            </div>
          </div>,
          {
            icon: "👋",
            autoClose: 3000,
          }
        );
        reset();
        setTimeout(() => navigate("/login"), 3500);
      },
      onError: (err) => {
        toast.error(
          <div>
            <div className="font-bold">Registration Failed</div>
            <div className="text-sm">
              {err.response?.data?.message ||
                "Please check your details and try again"}
            </div>
          </div>,
          {
            icon: <FaLock className="text-red-400" />,
          }
        );
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-black opacity-90"></div>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-700 border-opacity-50">
          <div className="p-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-center text-white mb-8"
            >
              Create Account
            </motion.h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  {...register("name")}
                  placeholder="Name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-300" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <select
                  {...register("role")}
                  defaultValue="customer"
                  className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none"
                >
                  <option value="customer" className="bg-gray-800">
                    Customer
                  </option>
                  <option value="provider" className="bg-gray-800">
                    Provider
                  </option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="relative"
              >
                <label className="flex items-center justify-center px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-300">
                  <FaCamera className="text-gray-400 mr-2" />
                  <span className="text-gray-300">Upload Profile Picture</span>
                  <input
                    type="file"
                    {...register("profilePic")}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                type="submit"
                disabled={registerMutation.isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
              >
                {registerMutation.isLoading ? (
                  <span className="flex items-center">
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
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                >
                  Sign in
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
    </div>
  );
}
