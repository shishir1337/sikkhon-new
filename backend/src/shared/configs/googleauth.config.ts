import { GoogleAuthConfig } from "./config.interface";

export default (): GoogleAuthConfig => ({
  client_id: process.env.GOOGLE_CLIENT_ID || '',
  client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
});

