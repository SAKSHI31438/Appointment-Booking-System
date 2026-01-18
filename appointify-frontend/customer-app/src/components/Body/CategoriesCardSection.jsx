import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Hospital,
  ScissorsLineDashed,
  TestTubes,
  Utensils,
} from "lucide-react";

const CategoriesCardSection = () => {
  return (
    <div className="mt-20 mb-10 mx-auto px-4  max-w-7xl">
      <h1 className=" font-bold text-3xl">Top Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-2 gap-8 mt-8 mb-8 ">
        <Link
          href="/"
          className="group cursor-pointer flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1"
        >
          <div className="w-12 h-12 bg-linear-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Hospital className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Hospitals</span>
        </Link>

        <button className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1">
          <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ScissorsLineDashed className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Salons</span>
        </button>

        <button className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1">
          <div className="w-12 h-12 bg-linear-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Hospital className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Clinics</span>
        </button>

        <button className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1">
          <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Utensils className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Restaurants</span>
        </button>

        <button className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1">
          <div className="w-12 h-12 bg-linear-to-br from-red-400 to-pink-500  rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <TestTubes className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Diagnostic Labs
          </span>
        </button>
      </div>
    </div>
  );
};

export default CategoriesCardSection;
