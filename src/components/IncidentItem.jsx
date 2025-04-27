import React from 'react';
import { useState } from 'react';

const IncidentItem = ({ incident, mainColor = "#65558F" }) => {
  const [expanded, setExpanded] = useState(false);

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get severity styling
  const getSeverityStyles = (severity) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return {
          badge: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: 'text-blue-500',
          expanded: 'bg-blue-50 border-blue-100'
        };
      case 'medium':
        return {
          badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: 'text-yellow-500',
          expanded: 'bg-yellow-50 border-yellow-100'
        };
      case 'high':
        return {
          badge: 'bg-red-100 text-red-800 border-red-200',
          icon: 'text-red-500',
          expanded: 'bg-red-50 border-red-100'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: 'text-gray-500',
          expanded: 'bg-gray-50 border-gray-100'
        };
    }
  };

  const severityStyles = getSeverityStyles(incident.severity);

  // Determine the severity icon
  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return (
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
        );
      case 'medium':
        return (
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        );
      case 'high':
        return (
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        );
      default:
        return null;
    }
  };

  return (
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="px-5 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{incident.title}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityStyles.badge}`}>
              {getSeverityIcon(incident.severity)}
                {incident.severity}
            </span>
            </div>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-[#65558F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(incident.reported_at)}</span>
            </div>
          </div>

          <button
              className={`px-3 py-1.5 text-sm rounded-md flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 ${
                  expanded
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-purple-50 text-[#65558F] hover:bg-purple-100'
              }`}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
          >
            {expanded ? (
                <>
                  <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Hide Details
                </>
            ) : (
                <>
                  <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  View Details
                </>
            )}
          </button>
        </div>

        {expanded && (
            <div className={`px-5 py-4 border-t ${severityStyles.expanded}`}>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Description:</h4>
              <p className="text-gray-700 whitespace-pre-line text-sm">{incident.description}</p>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div>ID: {incident.id}</div>
                  <div>Reported: {formatDate(incident.reported_at)}</div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default IncidentItem;