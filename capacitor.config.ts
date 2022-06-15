import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.home.mascotera',
  appName: 'Mascotera',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    pushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
