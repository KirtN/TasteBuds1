import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.taste-buds.app',
  appName: 'taste-buds',
  webDir: 'dist/taste-buds/browser',
  server: {
    androidScheme: "https",
    cleartext: true,
    allowNavigation: [
      "https://192.168.1.78:7072"
  ]}
};

export default config;
