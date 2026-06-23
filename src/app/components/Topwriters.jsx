"use client";

import { TrendingUp, Star } from "lucide-react";

const writers = [
  {
    name: "Marcus Bell",
    initial: "M",
    sales: 118,
  },
  {
    name: "Priya Sharma",
    initial: "P",
    sales: 80,
  },
  {
    name: "Eleanor Voss",
    initial: "E",
    sales: 76,
  },
];

export default function TopWriters() {
  return (
    <section className="bg-[#f7f5f3] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-sm text-[#9b7b63] mb-3">
            Most Popular
          </p>

          <h2 className="text-5xl font-bold text-[#111827]">
            Top Writers
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {writers.map((writer, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-white p-7 hover:shadow-lg transition"
            >
              {/* Top */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold">
                  {writer.initial}
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-black">
                    {writer.name}
                  </h3>

                  <p className="text-lg text-[#8b6d56]">
                    Published Author
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-7"></div>

              {/* Footer */}
              <div className="flex items-center gap-8 text-[#6b7280]">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} />
                  <span className="text-lg">
                    {writer.sales} sales
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star size={18} />
                  <span className="text-lg">Top Writer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}