import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Landing: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  SessionDetail: { sessionNumber: number };
  RecordingPlayback: { recordingUri: string };
};

export type MainTabsParamList = {
  Home: undefined;
  History: undefined;
};

export type LandingScreenProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;
export type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
export type MainTabsProps = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;
