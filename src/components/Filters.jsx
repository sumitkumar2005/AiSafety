import React from "react";

const Filters = ({
                   severityFilter,
                   setSeverityFilter,
                   sortOrder,
                   setSortOrder,
                   mainColor = "#65558F"
                 }) => {
  return (
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Filter Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap flex items-center">
              <svg className="h-5 w-5 mr-1.5 text-[#65558F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter by Severity:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                  className={`px-3.5 py-1.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors ${
                      severityFilter === 'All'
                          ? 'bg-[#65558F] text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-300'
                  }`}
                  onClick={() => setSeverityFilter('All')}
              >
                All Incidents
              </button>
              <button
                  className={`px-3.5 py-1.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors ${
                      severityFilter === 'Low'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                  }`}
                  onClick={() => setSeverityFilter('Low')}
              >
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-400 mr-1.5"></span>
                  Low
                </div>
              </button>
              <button
                  className={`px-3.5 py-1.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors ${
                      severityFilter === 'Medium'
                          ? 'bg-yellow-500 text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-300'
                  }`}
                  onClick={() => setSeverityFilter('Medium')}
              >
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 mr-1.5"></span>
                  Medium
                </div>
              </button>
              <button
                  className={`px-3.5 py-1.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors ${
                      severityFilter === 'High'
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-300'
                  }`}
                  onClick={() => setSeverityFilter('High')}
              >
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-red-400 mr-1.5"></span>
                  High
                </div>
              </button>
            </div>
          </div>

          {/* Sort Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap flex items-center">
              <svg className="h-5 w-5 mr-1.5 text-[#65558F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Sort by Date:
            </label>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                  className={`px-3.5 py-1.5 text-sm rounded-l-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors border ${
                      sortOrder === 'newest'
                          ? 'bg-[#65558F] text-white border-[#65558F]'
                          : 'bg-white text-gray-700 hover:bg-purple-50 border-gray-300'
                  }`}
                  onClick={() => setSortOrder('newest')}
              >
                Newest First
              </button>
              <button
                  className={`px-3.5 py-1.5 text-sm rounded-r-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors border ${
                      sortOrder === 'oldest'
                          ? 'bg-[#65558F] text-white border-[#65558F]'
                          : 'bg-white text-gray-700 hover:bg-purple-50 border-gray-300'
                  }`}
                  onClick={() => setSortOrder('oldest')}
              >
                Oldest First
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Filters;