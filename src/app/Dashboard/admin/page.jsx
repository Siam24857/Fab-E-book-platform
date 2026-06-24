import { Historyget, USerget } from "@/app/Action/Adminacitons";
import { allbookdata } from "@/app/Action/ALlbooks";
import DashboardCharts from "./Allcaht";
import { Toaster } from "react-hot-toast";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Shield,
} from "lucide-react";
import { userseissondata } from "@/app/Action/Userinfo";

const Adjminpage = async () => {
  try {
    const token = await userseissondata();
    
    // Fetch all data with error handling for each
    const [Userdata, writerdata, bookhistory, allbooks] = await Promise.all([
      USerget("reader").catch(err => {
        console.error("Error fetching readers:", err);
        return [];
      }),
      USerget("writer").catch(err => {
        console.error("Error fetching writers:", err);
        return [];
      }),
      Historyget(token).catch(err => {
        console.error("Error fetching history:", err);
        return [];
      }),
      allbookdata().catch(err => {
        console.error("Error fetching books:", err);
        return [];
      })
    ]);

    // Ensure all data is arrays
    const safeUserdata = Array.isArray(Userdata) ? Userdata : [];
    const safeWriterdata = Array.isArray(writerdata) ? writerdata : [];
    const safeBookhistory = Array.isArray(bookhistory) ? bookhistory : [];
    const safeAllbooks = Array.isArray(allbooks) ? allbooks : [];

    // Total Revenue with safe calculation
    const totalRevenue = safeBookhistory.reduce(
      (total, item) => total + Number(item?.amount || 0),
      0
    );

    // Revenue Chart Data
    const revenueData = [
      {
        name: "Revenue",
        revenue: totalRevenue,
      },
    ];

    // Genre Chart Data with safe processing
    const genreMap = {};

    safeAllbooks.forEach((book) => {
      const genre = book?.genre || "Unknown";
      genreMap[genre] = (genreMap[genre] || 0) + 1;
    });

    const genreData = Object.entries(genreMap).map(([name, value]) => ({
      name,
      value,
    }));

    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
        {/* Toaster Component */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2 text-gray-500 uppercase text-xs sm:text-sm">
            <Shield size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Admin Dashboard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            Platform Overview
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Users Card */}
          <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-shrink-0 group-hover:bg-blue-50 transition-colors">
              <Users className="text-blue-600" size={24} />
            </div>

            <div className="min-w-0">
              <h3 className="text-gray-500 text-sm sm:text-base">Total Users</h3>
              <p className="text-2xl sm:text-3xl font-bold truncate">
                {safeUserdata.length || 0}
              </p>
            </div>
          </div>

          {/* Total Writers Card */}
          <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
              <TrendingUp className="text-green-600" size={24} />
            </div>

            <div className="min-w-0">
              <h3 className="text-gray-500 text-sm sm:text-base">Total Writers</h3>
              <p className="text-2xl sm:text-3xl font-bold truncate">
                {safeWriterdata.length || 0}
              </p>
            </div>
          </div>

          {/* Books Sold Card */}
          <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
              <BookOpen className="text-orange-600" size={24} />
            </div>

            <div className="min-w-0">
              <h3 className="text-gray-500 text-sm sm:text-base">Books Sold</h3>
              <p className="text-2xl sm:text-3xl font-bold truncate">
                {safeBookhistory.length || 0}
              </p>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
              <DollarSign className="text-purple-600" size={24} />
            </div>

            <div className="min-w-0">
              <h3 className="text-gray-500 text-sm sm:text-base">Revenue</h3>
              <p className="text-2xl sm:text-3xl font-bold truncate">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-6 sm:mt-8">
          <DashboardCharts
            genreData={genreData}
            revenueData={revenueData}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Admin page error:", error);
    
    // Fallback UI when something goes wrong
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl border shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <Shield size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to Load Dashboard
          </h2>
          <p className="text-gray-600 mb-4">
            There was an error loading the admin dashboard. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
};

export default Adjminpage;