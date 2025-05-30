import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const WaterAnimation = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        Accelerometer.setUpdateInterval(16); // Set update interval to 16ms (60Hz)
        const subscription = Accelerometer.addListener(({ x, y }) => {
            setTilt({ x, y });
        });

        return () => subscription?.remove();
    }, []);

    const generateWavePath = (
        offsetY: number,
        depth: number,
        multiplier: number = 1,
    ): string => {
        const { x } = tilt;
        const translateX = x * 50 * multiplier;
        let d = `M0,${160 + offsetY}L`;

        const points = 50; // Increase the number of points for smoother wave
        for (let i = 0; i <= points; i++) {
            const xVal = (1440 / points) * i;
            const yVal =
                160 +
                offsetY +
                depth * Math.sin((i / points) * Math.PI * 2 + translateX / 10);
            d += `${xVal},${yVal}C`;
            if (i < points) {
                const controlX1 = xVal + 1440 / points / 3;
                const controlY1 = yVal;
                const nextX = (1440 / points) * (i + 1);
                const nextY =
                    160 +
                    offsetY +
                    depth *
                        Math.sin(
                            ((i + 1) / points) * Math.PI * 2 + translateX / 10,
                        );
                const controlX2 = nextX - 1440 / points / 3;
                d += `${controlX1},${controlY1},${controlX2},${nextY},`;
            }
        }
        d = d.slice(0, -1);
        d += `L1440,320L0,320Z`;
        return d;
    };

    return (
        <View style={styles.container}>
            <Svg
                height="80%"
                width="100%"
                viewBox="0 0 1440 320"
                style={styles.wave}
            >
                <Path
                    fill="#0ea6e9"
                    fillOpacity="0.41"
                    d={generateWavePath(-340, -20, 1.2)}
                />
                <Path
                    fill="#0ea6e9"
                    fillOpacity="0.41"
                    d={generateWavePath(-300, -30, 0.9)}
                />
                <Path
                    fill="#0ea6e9"
                    fillOpacity="1"
                    d={generateWavePath(-260, -30, 0.7)}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wave: {
        position: 'absolute',
        bottom: '-30%',
    },
});

export default WaterAnimation;
