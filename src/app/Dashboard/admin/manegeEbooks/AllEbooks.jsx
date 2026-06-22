"use client"

import React, { useState } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Bookuipdate } from "@/app/lib/Action/Adminacitons";

const AllEbooks = ({ allbookdatas }) => {
     
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  // Function to update book status (Publish/Draft)
  const handleUpdateStatus = async (id, currentStatus) => {
    // Toggle status
    const newStatus = currentStatus === "Published" ? "Draft" : "Published";
    
    // Confirm action
    if (!confirm(`Are you sure you want to change status to "${newStatus}"?`)) {
      return;
    }

    setLoadingId(id);
    
    try {
       const bookupdate = await Bookuipdate(id, newStatus)

   

      if (bookupdate) {
        toast.success(`Book status updated to "${newStatus}" successfully!`);
        // ✅ router.refresh() ব্যবহার করুন - সব ডিভাইসে কাজ করে
         redirect("/Dashboard/admin/manegeEbooks");
      } else {
        toast.error(bookupdate.message || "Failed to update book status");
      }
    } catch (error) {
      console.error("Error updating book status:", error);
      toast.error("Failed to update book status. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  // Function to delete book
  const handleDeleteBook = async (id) => {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this book? This action cannot be undone!")) {
      return;
    }

    setLoadingId(id);
    
    try {
      const response = await fetch(`/api/deletebook/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data) {
        toast.success("Book deleted successfully!");
        // ✅ router.refresh() ব্যবহার করুন - সব ডিভাইসে কাজ করে
        redirect("/Dashboard/admin/manegeEbooks");
      } else {
        toast.error(data.message || "Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-8 bg-[#f8f6f3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <p className="uppercase tracking-[4px] text-sm text-gray-500">
          Administration
        </p>

        <h1 className="text-5xl font-bold text-[#1b1430] mt-2">
          All Ebooks
        </h1>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#f4f1ed] border-b">
            <tr className="text-left text-sm uppercase tracking-wider text-gray-600">
              <th className="px-5 py-4">Cover</th>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Writer</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Genre</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allbookdatas?.map((book) => (
              <tr
                key={book._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Cover */}
                <td className="px-5 py-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-12 h-16 object-cover border"
                  />
                </td>

                {/* Title */}
                <td className="px-5 py-4 font-semibold text-lg">
                  {book.title}
                </td>

                {/* Writer */}
                <td className="px-5 py-4 text-gray-600">
                  {book.writer}
                </td>

                {/* Price */}
                <td className="px-5 py-4 font-bold">
                  ${book.price}
                </td>

                {/* Genre */}
                <td className="px-5 py-4">
                  <span className="px-3 py-1 bg-gray-100 rounded">
                    {book.genre}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`px-4 py-1 rounded font-medium ${
                      book.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {book.status || "Draft"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    {/* Status Toggle Button */}
                    <button
                      onClick={() => handleUpdateStatus(book._id, book.status)}
                      disabled={loadingId === book._id}
                      className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {book.status === "Published" ? (
                        <EyeOff
                          size={20}
                          className="text-gray-600 hover:text-black transition-colors"
                        />
                      ) : (
                        <Eye
                          size={20}
                          className="text-gray-600 hover:text-black transition-colors"
                        />
                      )}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      disabled={loadingId === book._id}
                      className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2
                        size={20}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      />
                    </button>

                    {/* Loading indicator */}
                    {loadingId === book._id && (
                      <span className="text-xs text-gray-400">Processing...</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {allbookdatas?.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No Books Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEbooks;