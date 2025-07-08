import { useForm } from "react-hook-form";
import { useChangePassword } from "../../hooks/auth/useAuth";
import { useDarkMode } from "../../context/DarkModeContext";
import { motion } from "framer-motion";
import { FiLock, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ChangePassword() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const changePasswordMutation = useChangePassword();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const newPassword = watch("newPassword", "");

  const onSubmit = (data) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        navigate(-1);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to change password");
      },
    });
  };

  const passwordStrength = () => {
    const strength = {
      0: "Very Weak",
      1: "Weak",
      2: "Moderate",
      3: "Strong",
      4: "Very Strong",
    };

    let score = 0;
    if (newPassword.length >= 8) score++;
    if (newPassword.match(/[a-z]/) && newPassword.match(/[A-Z]/)) score++;
    if (newPassword.match(/\d/)) score++;
    if (newPassword.match(/[^a-zA-Z0-9]/)) score++;

    return {
      text: strength[score],
      width: `${(score / 4) * 100}%`,
      color:
        score < 2 ? "bg-red-500" : score < 3 ? "bg-yellow-500" : "bg-green-500",
    };
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-md mx-auto p-4 sm:p-6">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-100"
            } shadow-md`}
          >
            <FiArrowLeft
              className={darkMode ? "text-gray-300" : "text-gray-700"}
            />
          </button>
          <h2 className="text-2xl font-bold text-center flex-1">
            Change Password
          </h2>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-100"
            } shadow-md`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl shadow-lg p-6 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border transition-all duration-300`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                className={`flex items-center gap-2 mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <FiLock />
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                  className={`w-full p-3 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:border-purple-500"
                      : "bg-gray-50 border-gray-200 focus:border-purple-400"
                  } border focus:ring-1 focus:ring-purple-500 transition-colors pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                className={`flex items-center gap-2 mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <FiLock />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className={`w-full p-3 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:border-purple-500"
                      : "bg-gray-50 border-gray-200 focus:border-purple-400"
                  } border focus:ring-1 focus:ring-purple-500 transition-colors pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}

              {newPassword && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      Password Strength: {passwordStrength().text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        passwordStrength().color
                      }`}
                      style={{ width: passwordStrength().width }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={changePasswordMutation.isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                changePasswordMutation.isLoading
                  ? "bg-purple-400"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white transition-colors mt-6`}
            >
              {changePasswordMutation.isLoading
                ? "Updating..."
                : "Update Password"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
