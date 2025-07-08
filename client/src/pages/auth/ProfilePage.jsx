import { useUserProfile, useEditProfile } from "../../hooks/auth/useAuth";
import { useForm } from "react-hook-form";
import { getImageUrl } from "../../utils/getImageUrl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit2, FiLock, FiUser, FiMail, FiArrowLeft } from "react-icons/fi";
import { useDarkMode } from "../../context/DarkModeContext";
import { toast } from "react-hot-toast";

export default function Profile() {
  const { data: user, isLoading } = useUserProfile();
  const { register, handleSubmit, reset } = useForm();
  const editProfileMutation = useEditProfile();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [preview, setPreview] = useState(null);

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`w-16 h-16 border-4 ${
            darkMode ? "border-purple-500" : "border-blue-500"
          } border-t-transparent rounded-full`}
        />
      </div>
    );
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.profilePic[0]) {
      formData.append("profilePic", data.profilePic[0]);
    }
    editProfileMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        if (data.profilePic[0]) {
          setPreview(URL.createObjectURL(data.profilePic[0]));
        }
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
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
          <h2 className="text-2xl font-bold text-center flex-1">My Profile</h2>
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
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <img
                src={
                  preview ||
                  getImageUrl(user?.profilePic) ||
                  "/default-profile.png"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/50 group-hover:border-purple-500 transition-colors"
              />
              <label
                htmlFor="profilePic"
                className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } group-hover:bg-purple-500 group-hover:text-white transition-colors`}
              >
                <FiEdit2 size={16} />
              </label>
            </div>
            <h3 className="text-xl font-semibold mt-4">{user?.name}</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {user?.email}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              {...register("profilePic", {
                onChange: (e) => {
                  handleFileChange(e);
                },
              })}
              className="hidden"
            />

            <div>
              <label
                className={`flex items-center gap-2 mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <FiUser />
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                {...register("name")}
                className={`w-full p-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:border-purple-500"
                    : "bg-gray-50 border-gray-200 focus:border-purple-400"
                } border focus:ring-1 focus:ring-purple-500 transition-colors`}
              />
            </div>

            <div>
              <label
                className={`flex items-center gap-2 mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <FiMail />
                Email Address
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className={`w-full p-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-400"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                } border cursor-not-allowed`}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={editProfileMutation.isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                editProfileMutation.isLoading
                  ? "bg-purple-400"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white transition-colors`}
            >
              {editProfileMutation.isLoading ? "Saving..." : "Save Changes"}
            </motion.button>
          </form>

          <button
            onClick={() => navigate("/change-password")}
            className={`w-full mt-4 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            <FiLock />
            Change Password
          </button>
        </motion.div>
      </div>
    </div>
  );
}
