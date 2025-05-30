import { RouteProp, useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    Linking,
    SafeAreaView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import WebView from 'react-native-webview';

import BackSvg from '../../assets/images/back';
import MenuSvg from '../../assets/images/menu';
import { RootStackParamList } from '../navigation/AppNavigator';

type WebViewScreenProps = {
    route: RouteProp<RootStackParamList, 'WebViewScreen'>;
};

export default function WebViewScreen({ route }: Readonly<WebViewScreenProps>) {
    const navigation = useNavigation();
    const { link } = route.params;
    const webViewRef = useRef<WebView>(null);

    const [currentUrl, setCurrentUrl] = useState(link);
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);

    const handleBackPress = useCallback(() => {
        navigation.goBack();
        return true;
    }, [navigation]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackPress,
            );
        };
    }, [canGoBack]);

    const handleShare = async () => {
        try {
            await Share.share({
                message: currentUrl,
            });
        } catch {}
        setIsMenuVisible(false);
    };

    const handleOpenInBrowser = async () => {
        try {
            await Linking.openURL(currentUrl);
        } catch {}
        setIsMenuVisible(false);
    };

    const handleCopyLink = async () => {
        await Clipboard.setStringAsync(currentUrl);
        setIsMenuVisible(false);
    };

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={closeMenu}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <BackSvg width={27} height={27} fill="#121212" />
                    </TouchableOpacity>

                    <Text numberOfLines={1} style={styles.urlText}>
                        {currentUrl}
                    </Text>

                    <TouchableOpacity onPress={toggleMenu}>
                        <MenuSvg width={38} height={38} fill="#121212" />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>

            {isMenuVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity
                        onPress={handleOpenInBrowser}
                        style={styles.dropdownItem}
                    >
                        <Text style={styles.dropdownText}>Open in browser</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleCopyLink}
                        style={styles.dropdownItem}
                    >
                        <Text style={styles.dropdownText}>Copy link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleShare}
                        style={styles.dropdownItem}
                    >
                        <Text style={styles.dropdownText}>Share</Text>
                    </TouchableOpacity>
                </View>
            )}

            <WebView
                ref={webViewRef}
                source={{ uri: currentUrl }}
                style={styles.webview}
                onNavigationStateChange={(navState) => {
                    setCurrentUrl(navState.url);
                    setCanGoBack(navState.canGoBack);
                }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
            />

            {isLoading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#fafafa',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    urlText: {
        flex: 1,
        marginLeft: 10,
        fontFamily: 'Cera_Bold',
        fontSize: 15,
        color: '#121212',
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: '10%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 999,
    },
    dropdownItem: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    dropdownText: {
        fontSize: 15,
        fontFamily: 'Cera_Bold',
        color: '#121212',
    },
    webview: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});
