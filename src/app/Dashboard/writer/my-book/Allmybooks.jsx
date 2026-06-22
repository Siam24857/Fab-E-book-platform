"use client";

import Link from "next/link";
import Image from "next/image";
import { PenLine, Eye, Trash2, PlusCircle } from "lucide-react";
import { BookDelete } from "@/app/lib/Action/Deletebook";
 

const Mybooks = ({ writerbook }) => {
    console.log(writerbook)
  const handleDelete = async (id) => {
    try {
      const result = await BookDelete(id);

      console.log(result);

      if (result.success) {
        alert("Book deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f4] p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="uppercase tracking-[4px] text-sm text-gray-500">
            Writer
          </p>

          <h1 className="text-5xl font-serif font-bold mt-2">
            My Ebooks
          </h1>
        </div>

        <Link
          href="/writer/add-ebook"
          className="bg-black text-white px-8 py-4 flex items-center gap-3"
        >
          <PlusCircle size={20} />
          Add Ebook
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 gap-4 px-6 py-5 bg-[#f3f0ec] border-b font-semibold text-gray-600 uppercase">
          <div>Cover</div>
          <div>Title</div>
          <div>Price</div>
          <div>Genre</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {writerbook?.map((book) => (
          <div
            key={book._id}
            className="grid grid-cols-6 gap-4 px-6 py-5 items-center border-b"
          >
            {/* Cover */}
            <div>
              <Image
                src={book.cover}
                alt={book.title}
                width={60}
                height={80}
                className="object-cover border w-[60px] h-[80px]"
              />
            </div>

            {/* Title */}
            <div className="font-semibold text-lg">
              {book.title}
            </div>

            {/* Price */}
            <div className="font-semibold">
              ${book.price}
            </div>

            {/* Genre */}
            <div>
              <span className="bg-gray-100 px-4 py-2 font-medium">
                {book.genre}
              </span>
            </div>

            {/* Status */}
            <div>
              <span
                className={`px-4 py-2 font-medium rounded ${
                  book.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {book.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5">
              <Link
                href={`/writer/edit/${book._id}`}
                className="text-gray-700 hover:text-black"
              >
                <PenLine size={20} />
              </Link>

              <Link
                href={`/ebook/${book._id}`}
                className="text-gray-700 hover:text-black"
              >
                <Eye size={20} />
              </Link>

              <button
                onClick={() => handleDelete(book._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {writerbook?.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No ebooks found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Mybooks;