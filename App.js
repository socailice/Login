import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './Apps/Screens/LoginScreen/LoginScreen';
import { SignedIn,SignedOut,ClerkProvider} from '@clerk/clerk-expo'
import HomeScreen from './Apps/Screens/Home/HomeScreen';


export default function App() {
  const [loaded, error] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });
  return (
    <View style={styles.container}>
      <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Text><HomeScreen/> </Text>
      </SignedIn>
      <SignedOut>
        <LoginScreen/>
      </SignedOut>
    </ClerkProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

