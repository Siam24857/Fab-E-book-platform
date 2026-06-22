"use client";

import { Userupdate } from "@/app/lib/Action/Adminacitons";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { BookDelete } from "@/app/lib/Action/Deletebook";

const Maneger = ({ alluserdata }) => {
  const router = useRouter();

 

  const handleUpdateUser = async (id, newRole) => {
    try {
      const updatedUser = await Userupdate(id, {
        role: newRole,
      });

      if (updatedUser?.success) {
        toast.success("User role updated successfully!");
        router.refresh();
      } else {
        toast.error(updatedUser?.message || "Update failed");
      }
    } catch (error) {
      toast.error("Failed to update user role");
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const deletedData = await BookDelete(id);

      if (deletedData?.deletedCount > 0 || deletedData?.success) {
        toast.success("User deleted successfully!");
        router.refresh();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <p className="uppercase tracking-widest text-gray-500 text-sm">
          Administration
        </p>

        <h1 className="text-5xl font-bold mt-2">
          Manage Users
        </h1>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-6 py-4">NAME</th>
              <th className="text-left px-6 py-4">EMAIL</th>
              <th className="text-left px-6 py-4">ROLE</th>
              <th className="text-left px-6 py-4">JOINED</th>
              <th className="text-left px-6 py-4">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {alluserdata?.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <span className="font-medium">
                      {user?.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-600">
                  {user?.email}
                </td>

                <td className="px-6 py-5">
                  <select
                    defaultValue={user?.role}
                    className="border px-4 py-2 rounded-md"
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

                <td className="px-6 py-5 text-gray-600">
                  {user?.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-6 py-5">
                  <button
                    onClick={() =>
                      handleDeleteUser(user._id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {alluserdata?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default Maneger;