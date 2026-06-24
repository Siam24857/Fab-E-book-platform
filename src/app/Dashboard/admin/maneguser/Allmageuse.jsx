"use client";

import { Userupdate } from "@/app/Action/Adminacitons";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { BookDelete } from "@/app/Action/Deletebook";

const Maneger = ({ token, alluserdata }) => {
  console.log(alluserdata);
  const router = useRouter();

  // Extract data from response if it's wrapped
  let userDataArray = alluserdata;
  if (alluserdata && alluserdata.success && Array.isArray(alluserdata.data)) {
    userDataArray = alluserdata.data;
  } else if (alluserdata && alluserdata.data && Array.isArray(alluserdata.data)) {
    userDataArray = alluserdata.data;
  } else if (!Array.isArray(alluserdata)) {
    userDataArray = [];
  }

  // Validate that userDataArray is an array
  const safeUserData = Array.isArray(userDataArray) ? userDataArray : [];

  console.log("Processed user data:", safeUserData);

  const handleUpdateUser = async (id, newRole) => {
    if (!id) {
      toast.error("Invalid user ID", {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌',
      });
      return;
    }

    try {
      const updatedUser = await Userupdate(token, id, {
        role: newRole,
      });

      if (updatedUser?.success) {
        toast.success("User role updated successfully!", {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '✅',
        });
        router.refresh();
      } else {
        toast.error(updatedUser?.message || "Failed to update user role", {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#EF4444',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '❌',
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.message || "Failed to update user role. Please try again.", {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌',
      });
    }
  };

  const handleDeleteUser = async (id) => {
    if (!id) {
      toast.error("Invalid user ID", {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌',
      });
      return;
    }

    // Confirm deletion with better UX
    if (!confirm("⚠️ Are you sure you want to delete this user? This action cannot be undone!")) {
      return;
    }

    try {
      const deletedData = await BookDelete(token, id);

      // Check if deletion was successful
      if (deletedData?.deletedCount > 0 || deletedData?.success || deletedData?.status === 200) {
        toast.success("User deleted successfully!", {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '🗑️',
        });
        router.refresh();
      } else {
        toast.error(deletedData?.message || "Failed to delete user", {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#EF4444',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '❌',
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.message || "Failed to delete user. Please try again.", {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌',
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 md:mb-8"
      >
        <p className="uppercase tracking-widest text-gray-500 text-xs sm:text-sm">
          Administration
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
          Manage Users
        </h1>
        
        {/* User count */}
        <p className="text-gray-500 mt-2 text-sm">
          Total Users: <span className="font-semibold text-gray-700">{safeUserData.length}</span>
        </p>
      </motion.div>

      {/* Table Container */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl border shadow-sm overflow-hidden"
      >
        {/* Responsive Table with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[768px] md:min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 uppercase">
                  NAME
                </th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 uppercase">
                  EMAIL
                </th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 uppercase">
                  ROLE
                </th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 uppercase">
                  JOINED
                </th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 uppercase">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="wait">
                {safeUserData.length > 0 ? (
                  safeUserData.map((user, index) => (
                    <motion.tr
                      key={user?._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      {/* Name */}
                      <td className="px-4 sm:px-6 py-4 sm:py-5">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white flex items-center justify-center rounded-full font-bold text-sm sm:text-base flex-shrink-0">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <span className="font-medium text-sm sm:text-base">
                            {user?.name || "Unknown User"}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-gray-600 text-sm sm:text-base">
                        <span className="line-clamp-1">
                          {user?.email || "No email provided"}
                        </span>
                      </td>

                      {/* Role - Responsive Select */}
                      <td className="px-4 sm:px-6 py-4 sm:py-5">
                        <select
                          defaultValue={user?.role || "reader"}
                          className="border px-2 sm:px-4 py-1 sm:py-2 rounded-md text-sm sm:text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          onChange={(e) =>
                            handleUpdateUser(
                              user?._id,
                              e.target.value
                            )
                          }
                        >
                          <option value="reader">User</option>
                          <option value="writer">Writer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      {/* Joined */}
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-gray-600 text-sm sm:text-base">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : "N/A"}
                      </td>

                      {/* Actions */}
                      <td className="px-4 sm:px-6 py-4 sm:py-5">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteUser(user?._id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
                          aria-label="Delete user"
                        >
                          <Trash2 size={18} className="sm:w-5 sm:h-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  // Empty State
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <td colSpan="5">
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">👤</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          No Users Found
                        </h3>
                        <p className="text-gray-400">
                          {alluserdata === null || alluserdata === undefined
                            ? "Unable to load user data"
                            : "There are no users to display"}
                        </p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Maneger;