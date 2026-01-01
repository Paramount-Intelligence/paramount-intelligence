// API URL helper - works in both dev and production
export const getApiUrl = () => {
  // In production on Vercel, use relative URLs (same domain)
  // In development, use the separate Express server
  return process.env.NEXT_PUBLIC_API_URL || '';
};
