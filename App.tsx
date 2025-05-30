import { Asset } from 'expo-asset';
import Toast from 'react-native-toast-message';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { UserProvider } from './src/contexts/UserContext';
import { WaterTrackerProvider } from './src/contexts/WaterTrackerContext';
import AppNavigator from './src/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync();

const loadResourcesAsync = async () => {
    await Font.loadAsync({
        Cera_Black: require('./assets/fonts/Cera-Black.otf'),
        Cera_Bold: require('./assets/fonts/Cera-Bold.otf'),
        Cera_Light: require('./assets/fonts/Cera-Light.otf'),
        Cera_Medium: require('./assets/fonts/Cera-Medium.otf'),
        Cera_Regular: require('./assets/fonts/Cera-Regular.otf'),
        Cera_Thin: require('./assets/fonts/Cera-Thin.otf'),
    });
};

const MainApp = React.memo(() => {
    const { colors } = useTheme();

    return (
        <WaterTrackerProvider>
            <UserProvider>
                <StatusBar
                    backgroundColor={colors.background}
                    barStyle={colors.status}
                />
                <AppNavigator />
                <Toast />
            </UserProvider>
        </WaterTrackerProvider>
    );
});

const App = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await loadResourcesAsync();
            } catch (error) {
                console.warn(error);
            } finally {
                setIsReady(true);
                SplashScreen.hideAsync();
            }
        };

        prepareApp();
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <ThemeProvider>
            <MainApp />
        </ThemeProvider>
    );
};

export default App;
