import { Link, useNavigate } from "react-router-dom";
import { useLogout, useUserProfile } from "../hooks/auth/useAuth";
import { getImageUrl } from "../utils/getImageUrl";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMessageSquare,
  FiHelpCircle,
  FiCreditCard,
  FiLogOut,
  FiSearch,
  FiCalendar,
  FiUser,
  FiHome,
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiSettings,
  FiLock,
  FiBook,
  FiStar,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Navbar() {
  const { data: user, isLoading } = useUserProfile();
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
    closeAllMenus();
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".profile-menu") &&
        !e.target.closest(".profile-image")
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return null;

  // Navigation links for different user roles
  const customerLinks = [
    {
      to: "/",
      icon: <FiHome className="text-green-400" />,
      text: "Home",
    },
    {
      to: "/customer/dashboard",
      icon: <FiHome className="text-blue-400" />,
      text: "Dashboard",
    },
    {
      to: "/customer/search",
      icon: <FiSearch className="text-purple-400" />,
      text: "Find Services",
    },
    {
      to: "/my-bookings",
      icon: <FiCalendar className="text-emerald-400" />,
      text: "My Bookings",
    },
    {
      to: "/my-reviews",
      icon: <FiStar className="text-yellow-400" />,
      text: "My Reviews",
    },
  ];

  const providerLinks = [
    {
      to: "/",
      icon: <FiHome className="text-green-400" />,
      text: "Home",
    },

    {
      to: "/provider/dashboard",
      icon: <FiHome className="text-blue-400" />,
      text: "Dashboard",
    },
    {
      to: "/provider/bookings",
      icon: <FiCalendar className="text-blue-400" />,
      text: "Bookings",
    },
  ];

  // Profile menu items
  const profileMenuItems = [
    {
      to: "/profile",
      icon: <FiUser className="text-amber-400" />,
      text: "Profile",
    },
    {
      to: "/change-password",
      icon: <FiLock className="text-yellow-400" />,
      text: "Change Password",
    },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/80 backdrop-blur-xl shadow-xl"
            : "bg-gray-900/60 backdrop-blur-lg"
        } border-b border-gray-700/50`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-300 p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <LogoSection
              user={user}
              navigate={navigate}
              logoHover={logoHover}
              setLogoHover={setLogoHover}
            />
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6">
            {(user.role === "customer" ? customerLinks : providerLinks).map(
              (link) => (
                <motion.li key={link.to} whileHover={{ scale: 1.05 }}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                </motion.li>
              )
            )}
          </ul>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            <DarkModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />

            <UserProfileSection
              user={user}
              profileMenuOpen={profileMenuOpen}
              setProfileMenuOpen={setProfileMenuOpen}
              profileMenuItems={profileMenuItems}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        user={user}
        customerLinks={customerLinks}
        providerLinks={providerLinks}
        profileMenuItems={profileMenuItems}
        handleLogout={handleLogout}
        closeAllMenus={closeAllMenus}
      />
    </>
  );
}

// Sub-components for better organization
function LogoSection({ user, navigate, logoHover, setLogoHover }) {
  return (
    <motion.div
      onHoverStart={() => setLogoHover(true)}
      onHoverEnd={() => setLogoHover(false)}
      className="flex items-center gap-2 cursor-pointer"
      onClick={() =>
        navigate(
          user.role === "customer"
            ? "/customer/dashboard"
            : "/provider/dashboard"
        )
      }
    >
      <motion.div
        animate={{
          rotate: logoHover ? [0, 15, -15, 0] : 0,
          scale: logoHover ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-70 animate-pulse"></div>
        <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          <motion.span
            animate={{
              scale: logoHover ? [1, 1.2, 1] : 1,
              opacity: logoHover ? [1, 0.8, 1] : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            ⚡
          </motion.span>
        </div>
      </motion.div>
      <motion.h2
        animate={{
          x: logoHover ? [0, 5, 0] : 0,
          color: logoHover ? "#a78bfa" : "#ffffff",
        }}
        transition={{ duration: 0.4 }}
        className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hidden sm:block"
      >
        NexusServe
      </motion.h2>
    </motion.div>
  );
}

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <motion.button
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 transition-all"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <FiSun className="text-yellow-400" />
      ) : (
        <FiMoon className="text-gray-300" />
      )}
    </motion.button>
  );
}

function UserProfileSection({
  user,
  profileMenuOpen,
  setProfileMenuOpen,
  profileMenuItems,
  handleLogout,
}) {
  return (
    <motion.div className="flex items-center gap-4 relative">
      <div className="hidden md:flex items-center gap-2">
        <motion.div className="relative">
          <motion.img
            src={getImageUrl(user?.profilePic)}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-purple-500/50 object-cover cursor-pointer profile-image"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -bottom-1 -right-1 bg-gray-800 p-1 rounded-full border border-gray-700"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            aria-label="Profile settings"
          >
            <FiSettings className="text-blue-400 text-xs" />
          </motion.button>
        </motion.div>
        <span className="text-gray-200 font-medium">{user.name}</span>
      </div>

      {/* Profile Dropdown Menu */}
      <AnimatePresence>
        {profileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="profile-menu absolute right-0 top-14 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700/50 overflow-hidden z-50"
          >
            <div className="p-2">
              {profileMenuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700/50 rounded-md transition-colors"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-700/50 p-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-gray-700/50 rounded-md transition-colors"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MobileMenu({
  mobileMenuOpen,
  user,
  customerLinks,
  providerLinks,
  profileMenuItems,
  handleLogout,
  closeAllMenus,
}) {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={closeAllMenus}
          />

          {/* Menu Content */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-80 max-w-full bg-gray-900 border-r border-gray-700/50 shadow-2xl overflow-y-auto"
          >
            {/* User Profile Section */}
            <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700/50">
              <div className="flex items-center gap-4">
                <img
                  src={getImageUrl(user?.profilePic)}
                  alt="Profile"
                  className="w-14 h-14 rounded-full border-2 border-purple-500/70 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-400 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="p-4 space-y-1">
              {(user.role === "customer" ? customerLinks : providerLinks).map(
                (link) => (
                  <motion.div key={link.to} whileTap={{ scale: 0.98 }}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
                      onClick={closeAllMenus}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="text-base">{link.text}</span>
                    </Link>
                  </motion.div>
                )
              )}
            </div>

            {/* Quick Actions (Customer Only) */}
            {user.role === "customer" && (
              <div className="px-4 py-3 border-t border-gray-700/50">
                <h4 className="text-xs uppercase text-gray-500 mb-2 px-4">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/customer/new-request"
                    className="flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg hover:bg-purple-500/10 transition-colors"
                    onClick={closeAllMenus}
                  >
                    <FiPlus className="text-purple-400 text-xl mb-1" />
                    <span className="text-xs text-gray-300">New Request</span>
                  </Link>
                  <Link
                    to="/messages"
                    className="flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg hover:bg-blue-500/10 transition-colors"
                    onClick={closeAllMenus}
                  >
                    <FiMessageSquare className="text-blue-400 text-xl mb-1" />
                    <span className="text-xs text-gray-300">Messages</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Account Section */}
            <div className="p-4 border-t border-gray-700/50">
              <h4 className="text-xs uppercase text-gray-500 mb-2 px-4">
                Account
              </h4>
              <div className="space-y-1">
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
                    onClick={closeAllMenus}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base">{item.text}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Support & Logout */}
            <div className="p-4 border-t border-gray-700/50">
              <Link
                to="/support"
                className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
                onClick={closeAllMenus}
              >
                <FiHelpCircle className="text-xl text-amber-400" />
                <span className="text-base">Help & Support</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 w-full px-4 py-3 text-red-400 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <FiLogOut className="text-xl" />
                <span className="text-base">Logout</span>
              </button>
            </div>

            {/* App Version */}
            <div className="p-4 text-center text-xs text-gray-500">
              NexusServe v1.0.0
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
