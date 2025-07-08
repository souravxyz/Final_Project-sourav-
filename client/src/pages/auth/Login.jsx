import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaUserTie,
  FaUserCog,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);
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
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("userId", res.user.id);
        console.log("Saving userId:", res.user.id);

        localStorage.setItem("role", res.user.role);

        const role = res.user.role;
        const roleConfig = {
          customer: {
            icon: <FaUserTie className="text-blue-400" />,
            path: "/",
            message: "Customer portal accessed",
          },
          provider: {
            icon: <FaUserShield className="text-purple-400" />,
            path: "/",
            message: "Provider dashboard unlocked",
          },
          admin: {
            icon: <FaUserCog className="text-emerald-400" />,
            path: "/admin",
            message: "Admin privileges granted",
          },
        };

        setHoveredRole(role);

        // Custom toast notification
        toast.success(
          <div>
            <div className="font-bold">Welcome back, {res.user.name}!</div>
            <div className="text-sm">{roleConfig[role].message}</div>
          </div>,
          {
            icon: roleConfig[role].icon,
            autoClose: 2000,
          }
        );

        setTimeout(() => {
          role === "admin"
            ? (window.location.href = roleConfig[role].path)
            : navigate("/");
        }, 1500);
      },
      onError: (err) => {
        toast.error(
          <div>
            <div className="font-bold">Login Failed</div>
            <div className="text-sm">
              {err.response?.data?.message || "Invalid credentials"}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700 border-opacity-60">
          <div className="p-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-400">
                Access your personalized dashboard
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-70 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-600"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
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
                  className="w-full pl-10 pr-12 py-3 bg-gray-700 bg-opacity-70 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-600"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  disabled={loginMutation.isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 ${
                    hoveredRole
                      ? hoveredRole === "customer"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : hoveredRole === "provider"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  } text-white font-semibold rounded-lg shadow-lg transition-all duration-500 flex items-center justify-center`}
                >
                  {loginMutation.isLoading ? (
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
                      {hoveredRole
                        ? `Entering ${hoveredRole} portal...`
                        : "Authenticating..."}
                    </span>
                  ) : (
                    <span>Login</span>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {hoveredRole && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-6 p-4 bg-gray-700 bg-opacity-50 rounded-lg flex items-center justify-center"
              >
                {hoveredRole === "customer" && (
                  <FaUserTie className="text-blue-400 text-2xl mr-3" />
                )}
                {hoveredRole === "provider" && (
                  <FaUserShield className="text-purple-400 text-2xl mr-3" />
                )}
                {hoveredRole === "admin" && (
                  <FaUserCog className="text-emerald-400 text-2xl mr-3" />
                )}
                <span className="text-gray-300">
                  Welcome {hoveredRole}! Redirecting...
                </span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center space-y-3"
            >
              <p className="text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
                >
                  Create one
                </button>
              </p>

              <p className="text-gray-400">
                Forgot your password?{" "}
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
                >
                  Reset it
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
