import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.sense.app',
  appName: 'Sense',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
