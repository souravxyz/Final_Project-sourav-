  import { useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useProviders } from "../../hooks/dashboard/useProviderDashboard";
  import { Link } from "react-router-dom";
  import { getImageUrl } from "../../utils/getImageUrl";
  import { toast } from "react-hot-toast";
  import {
    FiSearch,
    FiMapPin,
    FiStar,
    FiClock,
    FiFilter,
    FiX,
  } from "react-icons/fi";
  import { useDarkMode } from "../../context/DarkModeContext";

  export default function SearchPage() {
    const [filters, setFilters] = useState({
      category: "",
      location: "",
      search: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const providersPerPage = 9;

    const { darkMode, toggleDarkMode } = useDarkMode();
    const { data: providers = [], isLoading } = useProviders(filters);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Calculate pagination
    const indexOfLastProvider = currentPage * providersPerPage;
    const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
    const currentProviders = providers.slice(
      indexOfFirstProvider,
      indexOfLastProvider
    );
    const totalPages = Math.ceil(providers.length / providersPerPage);

    const handleChange = (e) => {
      setFilters((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      setCurrentPage(1); // Reset to first page when filters change
    };

    const handleSearch = (e) => {
      e.preventDefault();
      if (!filters.search && !filters.category && !filters.location) {
        toast("Please enter at least one search criteria", {
          icon: "🔍",
          style: {
            background: darkMode ? "#1F2937" : "#F3F4F6",
            color: darkMode ? "#E5E7EB" : "#374151",
          },
        });
      }
    };

    const resetFilters = () => {
      setFilters({ category: "", location: "", search: "" });
      setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        } py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with dark mode toggle */}
          <div className="flex justify-between items-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Find Service Providers
            </motion.h2>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-100"
              } shadow-md`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile filter toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } shadow-md`}
            >
              <FiFilter />
              Filters
              {showMobileFilters && <FiX className="ml-1" />}
            </button>
          </div>

          {/* Search Form - Desktop */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className={`hidden md:block ${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-lg mb-8 border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2 relative">
                <FiSearch
                  className={`absolute left-3 top-3 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search by keyword (e.g., 'plumbing', 'electrician')"
                  value={filters.search}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {filters.search && (
                  <button
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, search: "" }))
                    }
                    className={`absolute right-3 top-3 ${
                      darkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Category Select */}
              <div className="relative">
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="">All Categories</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="mechanic">Mechanic</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="cleaner">Cleaner</option>
                </select>
                {filters.category && (
                  <button
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, category: "" }))
                    }
                    className={`absolute right-3 top-3 ${
                      darkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Location Input */}
              <div className="relative">
                <FiMapPin
                  className={`absolute left-3 top-3 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  value={filters.location}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {filters.location && (
                  <button
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, location: "" }))
                    }
                    className={`absolute right-3 top-3 ${
                      darkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={resetFilters}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400"
                } shadow-md`}
              >
                Reset Filters
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md"
              >
                Search Providers
              </motion.button>
            </div>
          </motion.form>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden mb-6 overflow-hidden ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl shadow-lg border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <form onSubmit={handleSearch} className="p-4 space-y-4">
                  <div className="relative">
                    <FiSearch
                      className={`absolute left-3 top-3 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="text"
                      name="search"
                      placeholder="Search by keyword"
                      value={filters.search}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                  </div>

                  <div className="relative">
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    >
                      <option value="">All Categories</option>
                      <option value="plumber">Plumber</option>
                      <option value="electrician">Electrician</option>
                      <option value="mechanic">Mechanic</option>
                    </select>
                  </div>

                  <div className="relative">
                    <FiMapPin
                      className={`absolute left-3 top-3 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter Location"
                      value={filters.location}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={resetFilters}
                      className={`flex-1 py-2 rounded-lg font-medium ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      Reset
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg"
                    >
                      Search
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className={`w-12 h-12 border-4 ${
                  darkMode ? "border-purple-500" : "border-blue-500"
                } border-t-transparent rounded-full`}
              />
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div
                className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Showing {currentProviders.length} of {providers.length} providers
              </div>

              {/* Providers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {currentProviders.map((provider) => (
                    <motion.div
                      key={provider._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      whileHover={{
                        y: -5,
                        boxShadow: darkMode
                          ? "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                          : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      onHoverStart={() => setHoveredCard(provider._id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                        darkMode
                          ? hoveredCard === provider._id
                            ? "bg-gray-800 border-gray-600"
                            : "bg-gray-800/70 border-gray-700"
                          : hoveredCard === provider._id
                          ? "bg-white border-gray-200 shadow-lg"
                          : "bg-white border-gray-100 shadow-md"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 opacity-10 blur-xl"></div>

                      <div className="relative z-10 p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            animate={{
                              scale: hoveredCard === provider._id ? 1.05 : 1,
                              rotate: hoveredCard === provider._id ? 2 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 500 }}
                            className="relative flex-shrink-0"
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full blur opacity-20"></div>
                            <img
                              src={
                                provider.user?.profilePic
                                  ? getImageUrl(provider.user.profilePic)
                                  : "/default-profile.png"
                              }
                              alt={provider.user?.name}
                              className="relative z-10 w-16 h-16 rounded-full object-cover border-2 border-gray-600/50"
                            />
                          </motion.div>
                          <div>
                            <h3
                              className={`text-xl font-semibold ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {provider.user?.name}
                            </h3>
                            <p
                              className={`${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              } text-sm`}
                            >
                              {provider.services?.join(", ")}
                            </p>
                          </div>
                        </div>

                        <p
                          className={`mb-4 text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {provider.bio?.length > 100
                            ? `${provider.bio.substring(0, 100)}...`
                            : provider.bio}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <FiStar
                              className={`mr-1 ${
                                darkMode ? "text-yellow-400" : "text-yellow-500"
                              }`}
                            />
                            <span
                              className={`font-medium ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {provider.rating || "New"}
                            </span>
                          </div>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              darkMode
                                ? "bg-blue-900/30 text-blue-400 border border-blue-800/50"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            <FiMapPin className="mr-1" />
                            {provider.location}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`text-sm font-medium ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <FiClock className="inline-block mr-1" />
                            Charges: ₹{provider.charges}
                          </span>
                        </div>

                        <motion.div
                          animate={{
                            opacity: hoveredCard === provider._id ? 1 : 0.8,
                            scale: hoveredCard === provider._id ? 1.02 : 1,
                          }}
                        >
                          <Link
                            to={`/book/${provider._id}`}
                            className={`block w-full text-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                              darkMode
                                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                            }`}
                          >
                            Book Now
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-l-md ${
                        darkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
                          : "bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                      } border ${
                        darkMode ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 ${
                            currentPage === number
                              ? darkMode
                                ? "bg-purple-600 text-white"
                                : "bg-purple-500 text-white"
                              : darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          } border-t border-b ${
                            darkMode ? "border-gray-600" : "border-gray-300"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        paginate(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-r-md ${
                        darkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
                          : "bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                      } border ${
                        darkMode ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {!isLoading && providers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-center py-12 rounded-xl ${
                darkMode ? "bg-gray-800/50" : "bg-gray-50"
              } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 mb-3">
                <FiSearch size={24} />
              </div>
              <h3
                className={`text-xl font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                No providers found
              </h3>
              <p
                className={`mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                Try adjusting your search criteria
              </p>
              <button
                onClick={resetFilters}
                className={`mt-4 px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Reset all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }
