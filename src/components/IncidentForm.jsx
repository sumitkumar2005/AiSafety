import React from 'react';
import { useState, useEffect } from 'react';

const IncidentForm = ({ onAddIncident, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description should be at least 10 characters';
    }

    if (!formData.severity) {
      newErrors.severity = 'Severity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      const newIncident = {
        id: Date.now(),
        ...formData,
        reported_at: new Date().toISOString()
      };

      // Simulate a slight delay for better user experience
      await new Promise(resolve => setTimeout(resolve, 500));

      onAddIncident(newIncident);
    } else {
      setIsSubmitting(false);
    }
  };

  // Helper function to get severity option styling
  const getSeverityOptionStyle = (value) => {
    switch(value) {
      case 'Low':
        return 'text-emerald-800 bg-emerald-50';
      case 'Medium':
        return 'text-amber-800 bg-amber-50';
      case 'High':
        return 'text-rose-800 bg-rose-50';
      default:
        return '';
    }
  };

  // Handle backdrop click to close the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
      <div className="fixed inset-0 flex justify-center items-center z-50" onClick={handleBackdropClick}>
        <div className="fixed inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden w-full max-w-md z-10 relative animate-fadeIn" onClick={e => e.stopPropagation()}>
          <div className="bg-gradient-to-r bg-[#65558F] py-4 flex justify-between items-center">
            <div className={"m-4"}>
              <h2 className="text-xl font-semibold text-white">Report New Incident</h2>
              <p className="text-teal-50 text-sm mt-1">
                Submit details about a new AI safety incident
              </p>
            </div>
            <button
                onClick={onClose}
                className="text-white hover:text-teal-200 focus:outline-none"
                aria-label="Close form"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-gray-50">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Incident Title <span className="text-rose-500">*</span>
              </label>
              <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief title describing the incident"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      errors.title ? 'border-rose-300 bg-rose-50' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
              />
              {errors.title && <p className="mt-1 text-sm text-rose-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of what happened and any relevant context"
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      errors.description ? 'border-rose-300 bg-rose-50' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
              />
              {errors.description && <p className="mt-1 text-sm text-rose-600">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                Severity Level <span className="text-rose-500">*</span>
              </label>
              <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      errors.severity ? 'border-rose-300 bg-rose-50' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
              >
                <option value="Low" className={getSeverityOptionStyle('Low')}>Low - Minor issue with minimal impact</option>
                <option value="Medium" className={getSeverityOptionStyle('Medium')}>Medium - Significant issue requiring attention</option>
                <option value="High" className={getSeverityOptionStyle('High')}>High - Critical issue requiring immediate action</option>
              </select>
              {errors.severity && <p className="mt-1 text-sm text-rose-600">{errors.severity}</p>}
            </div>

            <div className="pt-3 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                <span className="text-rose-500">*</span> Required fields
              </p>
              <div className="flex space-x-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                    type="submit"
                    className={`px-5 py-2 bg-[#65558F] text-white font-medium rounded-md shadow hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                >
                  {isSubmitting ? (
                      <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                  ) : (
                      'Submit Incident'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default IncidentForm;