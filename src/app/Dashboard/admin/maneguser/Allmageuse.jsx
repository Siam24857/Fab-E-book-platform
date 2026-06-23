"use client";

import { Userupdate } from "@/app/lib/Action/Adminacitons";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { BookDelete } from "@/app/lib/Action/Deletebook";

const Maneger = ({ token, alluserdata }) => {
  const router = useRouter();

  const handleUpdateUser = async (id, newRole) => {
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
        toast.error(updatedUser?.message || "Update failed", {
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
      toast.error("Failed to update user role", {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      });
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone!")) {
      return;
    }

    try {
      const deletedData = await BookDelete(token, id);

      if (deletedData?.deletedCount > 0 || deletedData?.success) {
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
        toast.error("Delete failed", {
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
      toast.error("Failed to delete user", {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      });
      console.error(error);
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
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                  NAME
                </th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                  EMAIL
                </th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                  ROLE
                </th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                  JOINED
                </th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="wait">
                {alluserdata?.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50"
                  >
                    {/* Name */}
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white flex items-center justify-center rounded-full font-bold text-sm sm:text-base">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <span className="font-medium text-sm sm:text-base">
                          {user?.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-gray-600 text-sm sm:text-base">
                      <span className="line-clamp-1">{user?.email}</span>
                    </td>

                    {/* Role - Responsive Select */}
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <select
                        defaultValue={user?.role}
                        className="border px-2 sm:px-4 py-1 sm:py-2 rounded-md text-sm sm:text-base w-full sm:w-auto"
                        onChange={(e) =>
                          handleUpdateUser(
                            user._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="reader">
                          User
                        </option>

                        <option value="writer">
                          Writer
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>
                    </td>

                    {/* Joined */}
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-gray-600 text-sm sm:text-base">
                      {user?.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Actions */}
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          handleDeleteUser(user._id)
                        }
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <Trash2 size={18} className="sm:w-5 sm:h-5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {alluserdata?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-10 text-gray-500"
          >
            No users found
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Maneger;