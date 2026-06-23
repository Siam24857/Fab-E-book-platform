import { Historyget, USerget } from "@/app/Action/Adminacitons";
import { allbookdata } from "@/app/Action/ALlbooks";
import DashboardCharts from "./Allcaht";
import { motion } from "framer-motion";
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
  const token = await userseissondata();
  const Userdata = await USerget("reader");
  const writerdata = await USerget("writer");
  const bookhistory = await Historyget(token);
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

  // Animation variants for stats cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8"
    >
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
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 sm:mb-8 md:mb-10"
      >
        <div className="flex items-center gap-2 text-gray-500 uppercase text-xs sm:text-sm">
          <Shield size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Admin Dashboard</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
          Platform Overview
        </h1>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        {/* Total Users Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
            <Users className="text-blue-600" size={24} />
          </div>

          <div className="min-w-0">
            <h3 className="text-gray-500 text-sm sm:text-base">Total Users</h3>
            <p className="text-2xl sm:text-3xl font-bold truncate">
              {Userdata?.length || 0}
            </p>
          </div>
        </motion.div>

        {/* Total Writers Card */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
            <TrendingUp className="text-green-600" size={24} />
          </div>

          <div className="min-w-0">
            <h3 className="text-gray-500 text-sm sm:text-base">Total Writers</h3>
            <p className="text-2xl sm:text-3xl font-bold truncate">
              {writerdata?.length || 0}
            </p>
          </div>
        </motion.div>

        {/* Books Sold Card */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
            <BookOpen className="text-orange-600" size={24} />
          </div>

          <div className="min-w-0">
            <h3 className="text-gray-500 text-sm sm:text-base">Books Sold</h3>
            <p className="text-2xl sm:text-3xl font-bold truncate">
              {bookhistory?.length || 0}
            </p>
          </div>
        </motion.div>

        {/* Revenue Card */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
            <DollarSign className="text-purple-600" size={24} />
          </div>

          <div className="min-w-0">
            <h3 className="text-gray-500 text-sm sm:text-base">Revenue</h3>
            <p className="text-2xl sm:text-3xl font-bold truncate">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <DashboardCharts
          genreData={genreData}
          revenueData={revenueData}
        />
      </motion.div>
    </motion.div>
  );
};

export default Adjminpage;