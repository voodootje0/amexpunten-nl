// Get the base URL based on the environment
export function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  return 'https://amexpunten.nl';
} 