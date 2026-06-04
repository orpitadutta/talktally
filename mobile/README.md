# TalkTally Mobile

React Native mobile app for caregiver-guided speech development in toddlers using on-device audio detection and progress tracking.

## Quick Start

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
mobile/src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/            # Screen components
├── services/           # API, audio, recording, analytics
├── store/              # Zustand state management
├── theme/              # Design system & theme
├── types/              # TypeScript interfaces
└── utils/              # Utility functions
```

## Key Features

- 🎤 **On-Device Voice Detection** - Microphone calibration and real-time metering
- 📝 **15 Practice Sessions** - Structured lessons for phoneme progression
- 💾 **Local Recording** - Audio files stored on-device (not uploaded)
- 📊 **Progress Tracking** - Session history and accuracy metrics
- 🌐 **Backend Sync** - Session metadata synchronized to server
- ♿ **Accessibility** - Screen reader support, WCAG AA compliant

## Screens

- **LandingScreen** - Onboarding introduction
- **OnboardingScreen** - Toddler profile setup
- **HomeScreen** - Recommended session & session list
- **SessionScreen** - Live session with prompts & recording
- **SessionCompleteScreen** - Results & accuracy feedback
- **HistoryScreen** - Session history & playback

## State Management

- **useDeviceStore** - Device ID & profile management
- **useSessionStore** - Current session & step tracking
- **sessionStorage** - Local persistence & offline sync

## Services

- **api.ts** - Backend HTTP client
- **recordingService.ts** - Audio file management
- **logger.ts** - Structured logging
- **analytics.ts** - Event tracking
- **data.ts** - Session prompts & content

## Hooks

- **useVoiceDetection** - Audio metering & calibration lifecycle

## Configuration

Environment variables (create `.env` file):

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ANALYTICS_ENABLED=false
EXPO_PUBLIC_ANALYTICS_ENDPOINT=
```

## Type Safety

- TypeScript 5.3+ with strict mode
- Path aliases for clean imports
- Type definitions for all external APIs

## Testing

```bash
# Unit tests
npm test

# Type checking
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

## Privacy & Security

- ✅ No PII collected or transmitted
- ✅ Audio recordings remain on-device
- ✅ HTTPS-only backend communication
- ✅ Device ID used for anonymous tracking
- ✅ Microphone permissions explicit and scoped

## Dependencies

- **React Native** 0.73.6
- **Expo** 54.0.0
- **React Navigation** 6.x
- **Zustand** 4.4.0
- **Expo Audio** for recording
- **Axios** for HTTP requests
- **Zod** for validation

## Development

```bash
# Hot reload
Cmd+M (Android) or Cmd+D (iOS)

# Clear cache
npm start -- --clear

# Run with production environment
NODE_ENV=production npm start
```

## Deployment

Built with Expo, deployable to:
- Apple App Store (iOS)
- Google Play Store (Android)
- Web (optional)

See Expo docs for EAS build & submit.

## License

Proprietary - TalkTally

## Support

Contact: mobile@talktally.dev
