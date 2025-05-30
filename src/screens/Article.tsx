import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import BeverageSvg from '../../assets/images/article/beverage';
import HeartSvg from '../../assets/images/article/heart';
import HoneySvg from '../../assets/images/article/honey';
import MealSvg from '../../assets/images/article/meal';
import SeaSvg from '../../assets/images/article/sea';
import SuperheroSvg from '../../assets/images/article/superhero';
import TabBar from '../components/TabBar';
import { useTheme } from '../contexts/ThemeContext';

// Define the navigation parameter types
type RootStackParamList = {
    Article: undefined; // No params for Article
    WebViewScreen: { link: string }; // WebViewScreen expects a "link" parameter
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Article'>;

const items = [
    {
        id: '1',
        title: 'Benefits of drinking water',
        description:
            'Drinking water has numerous benefits. Water is crucial for many bodily functions, such as lubricating the joints, delivering oxygen throughout the body, preventing kidney damage, and more.',
        url: 'https://www.medicalnewstoday.com/articles/290814',
    },

    {
        id: '2',
        title: 'Drinking Liquids with Meals?',
        description:
            'Some claim that drinking beverages with meals is bad for your digestion. Naturally, you may wonder if a simple glass of water with your meal could have negative effects — or if that’s just another myth.',
        url: 'https://www.healthline.com/nutrition/drinking-with-meals',
    },

    {
        id: '3',
        title: 'How Liquid Are You?',
        description:
            'In 1964 I got my first job as a pharmacist and, soon after, secured a residential accommodation in Surulere area of Lagos Mainland. I lived there for a year before moving out. One thing that makes me remember that period was my neighbour, a young economics graduate, Jim Olisakwe...',
        url: 'https://pharmanewsonline.com/how-liquid-are-you/',
    },

    {
        id: '4',
        title: '100 Amazing Water Facts',
        description:
            'Water is the most important resource in the world. Here are 100 amazing facts about water that you may not know.',
        url: 'https://www.seametrics.com/blog/water-facts/',
    },

    {
        id: '5',
        title: 'Most popular beverages?',
        description:
            'There are many different types of beverages around the world. Every culture and region across the globe has its unique approach. Nevertheless, there are 10 specific graph types that statistically stand out as the most widely used worldwide.',
        url: 'https://nawon.com.vn/top-10-worlds-most-consumed-beverage/',
    },

    {
        id: '6',
        title: 'Most and least vicious liquids?',
        description:
            "'Most viscous' would be somewhat up to debate, as there are various materials that exhibit slow pastic deformation (flow) without really being considered ‘liquids’ in the usual sense.s",
        url: 'https://www.quora.com/What-are-the-most-and-the-least-viscous-liquids',
    },
];

const svgs = [HeartSvg, MealSvg, SuperheroSvg, SeaSvg, BeverageSvg, HoneySvg];
const backgroundColors = [
    '#FBC2EB',
    '#B5FFFC',
    '#FF9A8B',
    '#A6C1EE',
    '#FFF9BF',
    '#FFDEE9',
];
const screenHeight = Dimensions.get('window').height;
const tabBarHeight = 60;

export default function Article() {
    const navigation = useNavigation<NavigationProp>();

    // Access current theme and colors from the custom ThemeContext
    const { colors } = useTheme();

    const renderItem = ({
        item,
        index,
    }: {
        item: { id: string; title: string; description: string; url: string };
        index: number;
    }) => {
        const SvgImage = svgs[index % svgs.length]; // Assign corresponding SVG to the post

        return (
            <TouchableOpacity
                onPress={() => {
                    if (item.url) {
                        navigation.navigate('WebViewScreen', {
                            link: item.url,
                        });
                    }
                }}
            >
                <View
                    style={[
                        styles.itemContainer,
                        {
                            backgroundColor:
                                backgroundColors[
                                    index % backgroundColors.length
                                ],
                        },
                    ]}
                >
                    {/* Text Content */}
                    <View style={styles.textContainer}>
                        <Text
                            style={[styles.itemTitle, { color: '#121212' }]} // Use theme-based text color
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={[
                                styles.itemDescription,
                                { color: '#121212' }, // Use subText color for secondary text
                            ]}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                        >
                            {item.description}
                        </Text>
                    </View>

                    <View style={styles.imageContainer}>
                        <SvgImage width="100%" height="100%" />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background, // Use theme's background color
                        height: screenHeight - tabBarHeight,
                    },
                ]}
            >
                <Text
                    style={[styles.header, { color: colors.text }]} // Theme-based text color for header
                >
                    Article
                </Text>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                    contentContainerStyle={{
                        paddingBottom: tabBarHeight,
                    }}
                />
            </View>
            <TabBar />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        fontFamily: 'Cera_Black',
        textAlign: 'left',
        marginLeft: 28,
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        flex: 1,
        marginVertical: '4%',
        marginHorizontal: '5%',
        borderRadius: 18,
        overflow: 'hidden',
        alignItems: 'center',
    },
    textContainer: {
        flex: 0.6, // 60% width for text
        padding: 10,
    },
    imageContainer: {
        flex: 0.4, // 40% width for image
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    itemTitle: {
        fontSize: 18,
        paddingTop: 8,
        paddingLeft: 5,
        paddingBottom: 2,
        fontFamily: 'Cera_Bold',
    },
    itemDescription: {
        fontSize: 13,
        fontFamily: 'Cera_Light',
        paddingLeft: 5,
        paddingBottom: 10,
    },
});
