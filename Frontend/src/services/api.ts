import { toast } from 'sonner';

// Define base URL for API - you would replace this with your actual FastAPI endpoint when deployed
const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Generic function to handle API errors
 */
const handleApiError = (error: any): string => {
  console.error('API Error:', error);
  return error?.response?.data?.detail || error.message || 'An unknown error occurred';
};

/**
 * Service for investigation-related API calls
 */
export const investigationService = {
  /**
   * Submit an investigation request with optional file upload to the FastAPI backend
   */
  submitInvestigation: async (data: {
    personName: string;
    additionalInfo: string;
    email: string;
    country: string;
  }, file?: File | null) => {
    try {
      // Use FormData to handle both text data and file upload
      const formData = new FormData();
      
      // Add text fields to formData
      formData.append('personName', data.personName);
      formData.append('additionalInfo', data.additionalInfo || '');
      formData.append('email', data.email);
      formData.append('country', data.country);
      
      // Add file if it exists
      if (file) {
        formData.append('file', file);
      }
      
      const response = await fetch(`${API_BASE_URL}/api/investigations`, {
        method: 'POST',
        body: formData,
        // No Content-Type header; browser sets it with boundary for FormData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit investigation');
      }
      
      return await response.json();
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },
};

/**
 * Service for contact-related API calls
 */
export const contactService = {
  /**
   * Submit a contact request to the FastAPI backend
   */
  submitContact: async (data: {
    name: string;
    country: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit contact message');
      }
      
      return await response.json();
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },
};
