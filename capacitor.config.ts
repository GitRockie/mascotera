import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.home.mascotera',
  appName: 'Mascotera',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge','sound','alert']
    },
    GoogleAuth: {
      scopes: ['profile','email' ],
      serverClientId: '239710763571-d8netpfn0av59sihcam6v5de46b12kuk.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    },
    SplashScreen: {
      launchShowDuration: 5000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: false,
    }
  },
};


export default config;
