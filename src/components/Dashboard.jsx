import React from 'react';
import { useState, useEffect } from 'react';
import IncidentItem from './IncidentItem';
import IncidentForm from './IncidentForm';
import Filters from './Filters';
import { mockIncidents } from '../data/mockIncidents';

const Dashboard = () => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showForm, setShowForm] = useState(false);
  const [showHeroText, setShowHeroText] = useState(false);

  // Add scroll locking when modal is open
  useEffect(() => {
    if (showForm) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [showForm]);

  // Animation effect for hero text
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeroText(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle adding a new incident
  const handleAddIncident = (newIncident) => {
    setIncidents([newIncident, ...incidents]);
    setShowForm(false); // Hide form after submission
  };

  // Filter and sort incidents
  const getFilteredAndSortedIncidents = () => {
    // Apply severity filter
    const filtered = severityFilter === 'All'
        ? incidents
        : incidents.filter(incident => incident.severity === severityFilter);

    // Apply sort order
    return filtered.sort((a, b) => {
      const dateA = new Date(a.reported_at);
      const dateB = new Date(b.reported_at);

      return sortOrder === 'newest'
          ? dateB - dateA
          : dateA - dateB;
    });
  };

  const filteredIncidents = getFilteredAndSortedIncidents();

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50">
        <nav className="bg-gradient-to-r from-purple-900 to-[#65558F] shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center tracking-tight">
              AI Safety Incident Dashboard
            </h1>
            <div className="w-24 h-1 bg-purple-300 mx-auto mt-3 rounded-full"></div>
          </div>
        </nav>

        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Control header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-xl shadow-lg p-6 border-2 border-[#65558F]">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Incident  Management</h2>
                  <p className="text-gray-500">View, filter, and report safety incidents</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#65558F] hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Report New Incident
                </button>
              </div>
            </div>

            {/* Modal Form */}
            {showForm && (
                <IncidentForm
                    onAddIncident={handleAddIncident}
                    onClose={() => setShowForm(false)}
                />
            )}

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex items-center hover:shadow-lg transition-shadow duration-300">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <svg className="h-6 w-6 text-[#65558F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Incidents</p>
                  <p className="text-xl font-semibold text-[#65558F]">{incidents.length}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex items-center hover:shadow-lg transition-shadow duration-300">
                <div className="rounded-full bg-red-100 p-3 mr-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">High Severity</p>
                  <p className="text-xl font-semibold text-red-600">{incidents.filter(i => i.severity === 'High').length}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex items-center hover:shadow-lg transition-shadow duration-300">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Reported</p>
                  <p className="text-xl font-semibold text-green-600">
                    {incidents.length > 0 ? new Date(Math.max(...incidents.map(i => new Date(i.reported_at)))).toLocaleDateString() : 'None'}
                  </p>
                </div>
              </div>
            </div>

            {/* Filters with improved styling */}
            <div className="mb-6">
              <Filters
                  severityFilter={severityFilter}
                  setSeverityFilter={setSeverityFilter}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  mainColor="#65558F"
              />
            </div>

            {/* List header */}
            {filteredIncidents.length > 0 && (
                <div className="mb-4 bg-purple-50 rounded-lg p-4 shadow-md ]">
                  <h2 className="text-lg font-medium text-[#65558F]">
                    Showing {filteredIncidents.length} {filteredIncidents.length === 1 ? 'incident' : 'incidents'}
                    {severityFilter !== 'All' ? ` with ${severityFilter} severity` : ''}
                  </h2>
                </div>
            )}

            {/* Incidents List with improved spacing and transitions */}
            <div className="space-y-4">
              {filteredIncidents.length > 0 ? (
                  filteredIncidents.map(incident => (
                      <div key={incident.id} className="transform transition-all duration-200 hover:-translate-y-1">
                        <IncidentItem incident={incident} mainColor="#65558F" />
                      </div>
                  ))
              ) : (
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                    <div className="inline-flex items-center justify-center p-6 bg-purple-50 rounded-full mb-4">
                      <svg className="h-12 w-12 text-[#65558F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No incidents found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">No incidents match your current filters. Try changing your filter settings or add a new incident.</p>
                    {severityFilter !== 'All' && (
                        <button
                            onClick={() => setSeverityFilter('All')}
                            className="mt-4 px-4 py-2 text-sm text-[#65558F] bg-purple-50 rounded-md hover:bg-purple-100 transition-colors"
                        >
                          Clear filters
                        </button>
                    )}
                  </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-sm text-gray-500 py-6">
              <p className="flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-[#65558F] mr-2"></span>
                AI Safety Incident Dashboard • Made By Sumit
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;