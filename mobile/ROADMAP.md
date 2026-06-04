# TalkTally Mobile App - Implementation Roadmap

## Phase 1: Foundation ✅ COMPLETE
- [x] Project setup with Expo & React Native
- [x] TypeScript configuration with path aliases
- [x] Theme system & design tokens
- [x] Zustand store setup (device + session)
- [x] Voice detection hook (calibration, metering)
- [x] Recording service with local storage
- [x] API client for backend sync
- [x] Logger & analytics services
- [x] Error boundary & reusable components
- [x] Navigation scaffolding

## Phase 2: Screens & Flows (NEXT)
### 2.1 Onboarding Flow
- [ ] LandingScreen - Hero intro, "Get Started" CTA
- [ ] OnboardingScreen - Name input, age cohort dropdown
- [ ] Profile completion - Save to AsyncStorage

### 2.2 Home Screen
- [ ] Display toddler profile (name, age group)
- [ ] Show recommended session (via recommendationEngine)
- [ ] Display session list (grid or vertical)
- [ ] Session cards with emoji, title, focus sounds
- [ ] "Start Session" button flow

### 2.3 Session Screens
- [ ] SessionScreen
  - Calibration step with progress UI
  - Step display (prompt, phoneme, tip, emoji)
  - Progress bar (current step / total)
  - Record indicator & waveform (optional)
  - "Child Responded" / "No Response" buttons
  - Timer (timeout after 5-10s no response)
  - Recording lifecycle management

- [ ] SessionCompleteScreen
  - Accuracy score display
  - Tap to play back recordings (local playback)
  - Session summary card
  - "Next Session" / "View History" buttons

### 2.4 History Screen
- [ ] Session list (sorted by date, newest first)
- [ ] Accuracy badge per session
- [ ] Tap to view session details & playback
- [ ] Filter by age cohort or date range
- [ ] Offline sync status indicator

## Phase 3: Advanced Features
- [ ] Offline-first sync queue with retry logic
- [ ] Network state detection & handling
- [ ] Session upload status (pending/synced/failed)
- [ ] Manual retry UI for failed uploads
- [ ] Encrypted local backup (future)
- [ ] Parental controls & PIN (future)

## Phase 4: Polish & Testing
- [ ] Unit tests for stores, hooks, utils
- [ ] Integration tests for session flow
- [ ] E2E tests on device
- [ ] Accessibility audit (a11y)
- [ ] Performance profiling
- [ ] Dark mode consistency check
- [ ] Localization setup (i18n)

## Phase 5: Deployment
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] EAS build configuration
- [ ] App Store submission preparation
- [ ] Google Play Store submission prep
- [ ] Crash reporting (Sentry integration)
- [ ] Analytics provider setup

---

## Screen Component Template

Each screen should follow this structure:

```typescript
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '@theme/theme';
import { logger } from '@services/logger';

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenName'>;

export function ScreenName({ navigation, route }: Props) {
  const [state, setState] = useState<any>();

  useEffect(() => {
    // Initialize screen
    logger.info('ScreenName mounted');

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Screen content */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
});
```

---

## Testing Strategy

### Unit Tests
- Recommendation engine logic
- Store actions & reducers
- Utility functions (validation, formatting)
- Voice detection calculations

### Integration Tests
- Session flow: calibration → detection → save
- Session upload with mock backend
- Offline sync & retry

### E2E Tests
- Full happy path on device
- Permission flows
- Error scenarios

---

## State Management Guidelines

### useDeviceStore
- Generated once on first launch
- Stored in SecureStore (iOS) or encrypted SharedPreferences (Android)
- Used for all API requests as `deviceId`

### useSessionStore
- Holds current session & step state
- Updated during session playthrough
- Reset when starting new session

### sessionStorage
- Persistent AsyncStorage for session history
- Offline queue for pending uploads
- Cleared on successful sync

---

## Hook Lifecycle: useVoiceDetection

```
1. Mount → isReady = false
2. User triggers calibration → calibrate()
   - Request permission
   - Record 2s → calculate threshold
   - threshold = max(-50, peakNoise + 8dB)
3. After small delay → startMonitoring()
   - Begin recording
   - Poll metering every 100ms
   - Update isSpeaking based on threshold
4. When child speaks → isSpeaking = true
   - App starts child recorder
   - Save URI after "Child Responded" tap
5. Stop → stopMonitoring()
   - Stop polling
   - Cleanup recorder
```

---

## Component Library (Next Phase)

Extend components as needed:
- [ ] ProgressBar
- [ ] SessionCard
- [ ] RecordingIndicator
- [ ] AccuracyBadge
- [ ] EmotionAvatar (with emoji)
- [ ] PhonemeDisplay
- [ ] TimerDisplay
- [ ] OfflineSyncIndicator
- [ ] ErrorModal
- [ ] ConfirmDialog

---

## Environment Setup for Next Phase

### Required Env Vars
```env
EXPO_PUBLIC_API_URL=https://api.talktally.app   # Backend
NODE_ENV=production
```

### Development Tools
```bash
# Install ESLint & Prettier
npm install --save-dev eslint prettier @typescript-eslint/eslint-plugin

# Type check
npm run type-check

# Format code
npm run format

# Lint
npm run lint
```

---

## Navigation Structure (RootStackParamList)

```typescript
type RootStackParamList = {
  Landing: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  SessionDetail: { sessionNumber: number };
  RecordingPlayback: { recordingUri: string };
};

type MainTabsParamList = {
  Home: undefined;
  History: undefined;
};
```

---

## Backend Integration Checklist

- [ ] Backend running locally on `http://localhost:3000`
- [ ] `POST /sessions` accepting CreateSessionPayload
- [ ] `GET /sessions?deviceId=UUID` returning SessionListResponse
- [ ] `GET /health` health check endpoint
- [ ] HTTPS in production (Railway managed SSL)
- [ ] Rate limiting per deviceId
- [ ] Database indices on (device_id, completed_at)

---

## Performance Targets

- App cold start: < 3s (mid-range device)
- Session load: < 500ms
- Audio metering: 100ms polling (non-blocking)
- UI frame rate: 60fps during recording
- Session upload: < 5s on good network

---

## Accessibility Checklist

- [ ] All interactive elements have `accessibilityLabel`
- [ ] Buttons minimum 44x44pt touch target
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Support VoiceOver/TalkBack navigation
- [ ] Reduced motion preference respected
- [ ] Semantic HTML structure
- [ ] Focus management in modals

---

## Security Checklist

- [ ] No PII in logs or analytics
- [ ] Microphone permission scoped & justified
- [ ] HTTPS-only backend communication
- [ ] Device ID in SecureStore (not AsyncStorage)
- [ ] Sensitive strings not hardcoded
- [ ] No console.logs of sensitive data in production
- [ ] Input validation on all API calls

---

## Next Immediate Steps

1. **Create RootStackParamList type**
   - Path: `mobile/src/types/navigation.ts`

2. **Implement LandingScreen**
   - Hero image/logo
   - Title, subtitle
   - "Get Started" button

3. **Implement OnboardingScreen**
   - Form with FirstName input
   - Age cohort dropdown (4 options)
   - Save & navigate to MainTabs

4. **Update RootNavigator**
   - Add LandingScreen & OnboardingScreen
   - Add conditional rendering based on `isInitialized`

5. **Test on Expo**
   - `npm start`
   - Verify landing → onboarding → home flow

---

Generated: 2026-06-04
Contact: dev@talktally.dev
