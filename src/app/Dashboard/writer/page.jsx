import Link from "next/link";
import {
  BookOpen,
  Eye,
  TrendingUp,
  PlusCircle,
} from "lucide-react";

import { Writerbooks } from "@/app/lib/Action/Writerebook";
import { WriterHistorybook } from "@/app/lib/Action/Writerhistorysales";
import { userdata } from "@/app/lib/Action/Userinfo";
 

const Writepage = async () => {
  const user = await userdata();
  const writerbook = await Writerbooks(user?.id);
  const writerhistory = await WriterHistorybook(user?.id);

  const totalBooks = writerbook?.length || 0;

  const publishedBooks =
    writerbook?.filter(
      (book) => book.status === "Available"
    ).length || writerbook.length ;

  const totalSales = writerhistory?.length || 0;

  const revenue =
    writerhistory?.reduce(
      (total, sale) => total + Number(sale.price || 0),
      0
    ) || 0;

  const stats = [
    {
      title: "Total Ebooks",
      value: totalBooks || 0,
      icon: BookOpen,
    },
    {
      title: "Published",
      value: publishedBooks || 0,
      icon: Eye,
    },
    {
      title: "Total Sales",
      value: totalSales || 0,
      icon: TrendingUp,
    },
    {
      title: "Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f4] p-8">
      <div className="mb-10">
        <p className="uppercase tracking-[4px] text-sm text-gray-500">
          Writer Dashboard
        </p>

        <h1 className="text-5xl font-serif font-bold mt-2">
          Welcome, {user?.name || "Writer"}!
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center gap-4"
            >
              <div className="w-14 h-14 border bg-gray-50 flex items-center justify-center">
                <Icon size={28} />
              </div>

              <div>
                <p className="text-gray-600">
                  {item?.title}
                </p>

                <h3 className="text-3xl font-serif font-bold">
                  {item?.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/writer/add-ebook"
          className="bg-black text-white px-8 py-4 flex items-center gap-3"
        >
          <PlusCircle size={20} />
          Add Ebook
        </Link>

        <Link
          href="/writer/manage-ebooks"
          className="border bg-white px-8 py-4"
        >
          Manage Ebooks
        </Link>

        <Link
          href="/writer/sales"
          className="border bg-white px-8 py-4"
        >
          View Sales
        </Link>
      </div>
    </div>
  );
};

export default Writepage;