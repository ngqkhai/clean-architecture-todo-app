/**
 * ResponseFormatter - Consistent API Response Format
 * 
 * Provides utility functions for formatting API responses consistently.
 */

/**
 * Formats a successful response
 */
export function success(data, message = 'Success') {
  return {
    success: true,
    message,
    data
  };
}

/**
 * Formats an error response
 */
export function error(message, statusCode = 500, details = null) {
  const response = {
    success: false,
    message,
    error: {
      statusCode,
      message
    }
  };

  if (details) {
    response.error.details = details;
  }

  return response;
}

