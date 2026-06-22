import { Historyget, USerget } from "@/app/lib/Action/Adminacitons";
import { allbookdata } from "@/app/lib/Action/ALlbooks";
import DashboardCharts from "./Allcaht";

import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Shield,
} from "lucide-react";

const Adjminpage = async () => {
  const Userdata = await USerget("reader");
  const writerdata = await USerget("writer");
  const bookhistory = await Historyget();
  const allbooks = await allbookdata();

  // Total Revenue
  const totalRevenue = bookhistory.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );

  // Revenue Chart Data
  const revenueData = [
    {
      name: "Revenue",
      revenue: totalRevenue,
    },
  ];

  // Genre Chart Data
  const genreMap = {};

  allbooks.forEach((book) => {
    const genre = book.genre || "Unknown";

    genreMap[genre] = (genreMap[genre] || 0) + 1;
  });

  const genreData = Object.entries(genreMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-gray-500 uppercase text-sm">
          <Shield size={18} />
          <span>Admin Dashboard</span>
        </div>

        <h1 className="text-5xl font-bold mt-2">
          Platform Overview
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6 flex items-center gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <Users className="text-blue-600" size={28} />
          </div>

          <div>
            <h3 className="text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold">
              {Userdata?.length || 0}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 flex items-center gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <TrendingUp className="text-green-600" size={28} />
          </div>

          <div>
            <h3 className="text-gray-500">Total Writers</h3>
            <p className="text-3xl font-bold">
              {writerdata?.length || 0}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 flex items-center gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <BookOpen className="text-orange-600" size={28} />
          </div>

          <div>
            <h3 className="text-gray-500">Books Sold</h3>
            <p className="text-3xl font-bold">
              {bookhistory?.length || 0}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 flex items-center gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <DollarSign className="text-purple-600" size={28} />
          </div>

          <div>
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-3xl font-bold">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <DashboardCharts
        genreData={genreData}
        revenueData={revenueData}
      />
    </div>
  );
};

export default Adjminpage;