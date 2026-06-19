"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Star, Users, ArrowRight } from "lucide-react";

const FeaturedEbooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const mockEbooks = [
          {
            _id: "1",
            title: "The Silent Echo",
            writer: "Sarah Johnson",
            price: 9.99,
            genre: "Mystery",
            coverImage: "/api/placeholder/300/400",
            rating: 4.8,
            sold: 120,
          },
          {
            _id: "2",
            title: "Dreams of Tomorrow",
            writer: "Michael Chen",
            price: 12.99,
            genre: "Sci-Fi",
            coverImage: "/api/placeholder/300/400",
            rating: 4.6,
            sold: 85,
          },
          {
            _id: "3",
            title: "Whispers in the Dark",
            writer: "Emily Rodriguez",
            price: 8.99,
            genre: "Horror",
            coverImage: "/api/placeholder/300/400",
            rating: 4.9,
            sold: 95,
          },
          {
            _id: "4",
            title: "Love in Paris",
            writer: "Emma Thompson",
            price: 11.99,
            genre: "Romance",
            coverImage: "/api/placeholder/300/400",
            rating: 4.7,
            sold: 150,
          },
          {
            _id: "5",
            title: "The Lost Kingdom",
            writer: "David Wilson",
            price: 14.99,
            genre: "Fantasy",
            coverImage: "/api/placeholder/300/400",
            rating: 4.5,
            sold: 200,
          },
          {
            _id: "6",
            title: "Midnight Secrets",
            writer: "Lisa Park",
            price: 10.99,
            genre: "Thriller",
            coverImage: "/api/placeholder/300/400",
            rating: 4.8,
            sold: 110,
          },
        ];
        setEbooks(mockEbooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ebooks:", error);
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured Ebooks</h2>
            <p className="text-gray-600 mt-2">Loading amazing books...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Featured Ebooks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most popular and highly-rated ebooks from talented writers
            around the world.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {ebooks.map((ebook) => (
            <motion.div
              key={ebook._id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all group"
            >
              <Link href={`/ebook/${ebook._id}`}>
                <div className="relative h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white/50" />
                  </div>
                  {ebook.sold > 100 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Bestseller
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold px-4 py-2 border-2 border-white rounded-lg">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <Link href={`/ebook/${ebook._id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors mb-2">
                    {ebook.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3">by {ebook.writer}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                    {ebook.genre}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold">{ebook.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{ebook.sold} sold</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-indigo-600">
                      ${ebook.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/ebook/${ebook._id}`}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/browse"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            View All Ebooks
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEbooks;