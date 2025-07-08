import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  getProfile,
  resetPassword,
  forgetPassword,
  logoutUser,
  editProfile,
  resetPasswordWithToken,
} from "../../api/apiHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// 🔐 Register user
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// 🔐 Login user
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

// 👤 Get current user profile
export const useUserProfile = (options = {}) => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getProfile,
    ...options,
  });
};

// ✏️ Edit user profile
export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => editProfile(formData),
    onSuccess: (res, _variables, context) => {
      const updatedUser = res?.data;

      toast.success("Profile updated");

      if (updatedUser) {
        queryClient.setQueryData(["userProfile"], updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        queryClient.removeQueries(["userProfile"]);
        localStorage.removeItem("user");
      }

      queryClient.invalidateQueries(["userProfile"]);
      context?.onSuccessCallback?.();
    },
  });
};

// 🔄 Reset password
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwordData) => resetPassword(passwordData),
  });
};

// 🧠 Forgot password (send reset email)
export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPassword,
  });
};

// 🔑 After forgot password reset via token
export const useResetPasswordWithToken = () => {
  return useMutation({
    mutationFn: resetPasswordWithToken,
  });
};

// 🚪 Logout user
export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    },
    onError: (err) => {
      console.error("Logout failed:", err);
    },
  });
};
