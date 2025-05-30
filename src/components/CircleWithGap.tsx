import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type CircleWithGapProps = {
    radius?: number;
    strokeWidth?: number;
    color?: string;
    gapAngle?: number;
};

const windowWidth = Dimensions.get('window').width;

const CircleWithGap: React.FC<CircleWithGapProps> = ({
    radius = windowWidth * 0.43,
    strokeWidth = 18,
    color = '#4caf50',
    gapAngle = 20,
}) => {
    const circumference = 2 * Math.PI * radius;
    const gapLength = circumference * (gapAngle / 360);
    const offset = circumference / 2 - gapLength / 2;
    const rotationOffset = (circumference / 4) * 3;

    return (
        <View style={styles.container}>
            <Svg
                height={radius * 2 + strokeWidth * 2}
                width={radius * 2 + strokeWidth * 2}
            >
                <Circle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference * ((360 - gapAngle) / 360)} ${gapLength}`}
                    strokeDashoffset={offset + rotationOffset}
                    strokeLinecap="round"
                    fill="none"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        zIndex: 1,
        alignItems: 'center',
    },
});

export default CircleWithGap;
