"use client";

 
import { useSession } from "@/app/lib/auth-client";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// Farmer Motion Component
const FarmerMotion = () => (
  <span className="inline-block animate-farmerMotion text-4xl md:text-5xl ml-2">
    👨‍🌾
  </span>
);

const Readerpage = ({historyData}) => {
  const { data: session, isPending, error } = useSession();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCRUDLoading, setIsCRUDLoading] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        
      
        
        setUser(session.user);
        setHistory(historyData);
        toast.success('📚 Welcome back!');
      } catch (error) {
        toast.error('❌ Failed to load dashboard');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // CRUD Operations with Toast & Farmer Motion
  const handleAddPurchase = async (newPurchase) => {
    setIsCRUDLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setHistory(prev => [newPurchase, ...prev]);
      toast.success('✅ Purchase added successfully!');
    } catch (error) {
      toast.error('❌ Failed to add purchase');
    } finally {
      setIsCRUDLoading(false);
    }
  };

  const handleUpdatePurchase = async (index, updatedData) => {
    setIsCRUDLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setHistory(prev => prev.map((item, i) => 
        i === index ? { ...item, ...updatedData } : item
      ));
      toast.success('🔄 Purchase updated successfully!');
    } catch (error) {
      toast.error('❌ Failed to update purchase');
    } finally {
      setIsCRUDLoading(false);
    }
  };

  const handleDeletePurchase = async (index) => {
    setIsCRUDLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setHistory(prev => prev.filter((_, i) => i !== index));
      toast.success('🗑️ Purchase removed successfully!');
    } catch (error) {
      toast.error('❌ Failed to delete purchase');
    } finally {
      setIsCRUDLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const totalSpent = history.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-4 sm:p-6 md:p-8">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#f0fdf4',
            color: '#14532d',
            border: '1px solid #86efac',
            borderRadius: '16px',
            padding: '12px 20px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#f0fdf4',
              border: '1px solid #86efac',
            },
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#991b1b',
            },
          },
        }}
      />

      {/* Header with Farmer Motion */}
      <div className="mb-6 sm:mb-8 md:mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-gray-500">
            Reader Dashboard
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center gap-2">
            Welcome, {user?.name || "Reader"}!
            <FarmerMotion />
          </h1>
        </div>
        
        {/* CRUD Action Button (Example) */}
        <button
          onClick={() => handleAddPurchase({
            booktitle: "New Book",
            amount: 19.99,
            coverimg: "/default-cover.jpg",
            timestamp: new Date().toISOString()
          })}
          disabled={isCRUDLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-50 disabled:cursor-wait flex items-center gap-2"
        >
          {isCRUDLoading && <span className="spinner-small"></span>}
          Add Sample Purchase
        </button>
      </div>

      {/* Stats - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border p-5 sm:p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 uppercase text-xs sm:text-sm tracking-wider">
            Purchased
          </h3>
          <p className="text-3xl sm:text-4xl font-bold mt-2">
            {history.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-5 sm:p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 uppercase text-xs sm:text-sm tracking-wider">
            Purchase History
          </h3>
          <p className="text-3xl sm:text-4xl font-bold mt-2">
            {history.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-5 sm:p-6 hover:shadow-lg transition-shadow sm:col-span-2 md:col-span-1">
          <h3 className="text-gray-500 uppercase text-xs sm:text-sm tracking-wider">
            Total Spent
          </h3>
          <p className="text-3xl sm:text-4xl font-bold mt-2 text-green-700">
            ${totalSpent.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Purchases - Responsive Table */}
      <div className="mt-6 sm:mt-8 md:mt-10 bg-white rounded-2xl sm:rounded-3xl border p-4 sm:p-6 md:p-8">
        <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 md:mb-8 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Recent Purchases
          </h2>
          <button className="text-green-600 hover:text-green-800 text-sm font-medium transition">
            View All →
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 farmer-motion">📚</div>
            <p className="text-gray-500 text-lg">No purchases found.</p>
            <p className="text-gray-400 text-sm mt-2">Start your reading journey today!</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {history.map((book, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-4 border-b last:border-b-0 gap-3 sm:gap-4 hover:bg-gray-50/50 px-2 rounded-lg transition"
              >
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <Image
                    src={book.coverimg || "/default-cover.jpg"}
                    alt={book.booktitle || "Book cover"}
                    width={60}
                    height={80}
                    className="rounded-md object-cover w-12 h-16 sm:w-[60px] sm:h-[80px]"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {book.booktitle || "Untitled"}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {book.timestamp ? new Date(book.timestamp).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 sm:gap-4">
                  <p className="font-bold text-sm sm:text-base">
                    ${book.amount?.toFixed(2) || "0.00"}
                  </p>
                  
                  {/* CRUD Actions with Toast */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdatePurchase(index, {
                        amount: (book.amount || 0) + 1
                      })}
                      disabled={isCRUDLoading}
                      className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm transition disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePurchase(index)}
                      disabled={isCRUDLoading}
                      className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm transition disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loading Spinner for CRUD Operations */}
      {isCRUDLoading && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white shadow-xl rounded-full p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-green-200">
          <span className="spinner-small"></span>
          <span className="text-xs sm:text-sm text-green-700 font-medium">Processing...</span>
        </div>
      )}

      <style jsx>{`
        @keyframes farmerSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes farmerBob {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-farmerMotion {
          animation: farmerSway 3s ease-in-out infinite, farmerBob 2.4s ease-in-out infinite alternate;
          transform-origin: center bottom;
          display: inline-block;
        }
        .farmer-motion {
          animation: farmerSway 3s ease-in-out infinite, farmerBob 2.4s ease-in-out infinite alternate;
          transform-origin: center bottom;
          display: inline-block;
        }
        .spinner {
          border: 4px solid #e2e8f0;
          border-top: 4px solid #16a34a;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        .spinner-small {
          border: 2px solid #e2e8f0;
          border-top: 2px solid #16a34a;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Readerpage;