import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.aios',
  appName: 'aios-mobile',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
