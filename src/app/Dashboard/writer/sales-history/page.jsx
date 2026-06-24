import { userdata, userseissondata } from "@/app/Action/Userinfo";
import { WriterHistorybook } from "@/app/Action/Writerhistorysales";
import { TrendingUp } from "lucide-react";

const Slaeshistory = async () => {
    const token = await userseissondata()
    const user = await userdata();
    const writerhistory = await WriterHistorybook(token, user?.id);

    console.log(writerhistory)

    // ✅ Fixed: Extract data from wrapped response
    const extractSalesData = (data) => {
        // If it's already an array, return it
        if (Array.isArray(data)) {
            return data;
        }
        // If it's the wrapped response object with data property
        if (data && typeof data === 'object') {
            // Check for success/data structure
            if (data.success && Array.isArray(data.data)) {
                return data.data;
            }
            // Check for just data property
            if (data.data && Array.isArray(data.data)) {
                return data.data;
            }
            // Check if the object itself is the data array wrapped in an object with numeric keys
            const values = Object.values(data);
            if (values.length > 0 && Array.isArray(values[0])) {
                return values[0];
            }
        }
        return [];
    };

    // Ensure writerhistory is always an array
    const salesData = extractSalesData(writerhistory);

    const totalRevenue = salesData.reduce(
        (sum, book) => sum + Number(book?.amount || 0),
        0
    ) || 0;

    return (
        <div className="min-h-screen bg-[#f8f6f4] p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="mb-6 sm:mb-8 md:mb-10">
                <p className="uppercase tracking-[4px] text-xs sm:text-sm text-gray-500">
                    Earnings
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-2">
                    Sales History
                </h1>
            </div>

            {/* Revenue Card */}
            <div className="w-full sm:w-fit border border-gray-300 bg-[#f3f0ec] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                    <TrendingUp size={24} className="sm:w-7 sm:h-7 md:w-[28px] md:h-[28px]" />

                    <div>
                        <p className="uppercase text-xs sm:text-sm tracking-[2px] text-gray-500">
                            Total Revenue
                        </p>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                            ${totalRevenue.toFixed(2)}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border shadow-sm">
                {/* Table Header */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 bg-[#f3f0ec] border-b font-semibold text-gray-600 uppercase text-xs sm:text-sm">
                    <div>Ebook</div>
                    <div className="hidden sm:block">Writer</div>
                    <div>Amount</div>
                    <div className="hidden sm:block">Date</div>
                </div>

                {/* Table Body */}
                {salesData.length > 0 ? (
                    salesData.map((book, index) => {
                        const bookId = book?._id || `sale-${index}`;
                        return (
                            <div
                                key={bookId}
                                className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 py-4 sm:py-5 items-center border-b hover:bg-gray-50 transition-colors"
                            >
                                <div className="font-medium text-sm sm:text-base truncate">
                                    {book?.booktitle || 'N/A'}
                                </div>

                                <div className="hidden sm:block text-sm sm:text-base">
                                    {user?.name || 'Unknown'}
                                </div>

                                <div className="font-semibold text-sm sm:text-base">
                                    ${Number(book?.amount || 0).toFixed(2)}
                                </div>

                                <div className="hidden sm:block text-sm sm:text-base">
                                    {book?.date ? new Date(book.date).toLocaleDateString() : 'N/A'}
                                </div>

                                {/* Mobile: Show Writer and Date in a compact view */}
                                <div className="sm:hidden col-span-2 text-xs text-gray-500 space-y-1 mt-1">
                                    <div>
                                        <span className="font-medium text-gray-600">Writer:</span> {user?.name || 'Unknown'}
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Date:</span> {book?.date ? new Date(book.date).toLocaleDateString() : 'N/A'}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-[200px] sm:h-[220px] flex items-center justify-center text-base sm:text-xl text-gray-500 p-4 text-center">
                        <div>
                            <div className="text-4xl sm:text-6xl mb-4">📊</div>
                            <p>
                                {writerhistory === null || writerhistory === undefined 
                                    ? 'Unable to load sales data.' 
                                    : 'No sales yet.'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Slaeshistory;