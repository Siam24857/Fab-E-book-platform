export const getBackendUrl = () => {
  const configuredUrl = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;
  return configuredUrl || "http://localhost:5000";
};
