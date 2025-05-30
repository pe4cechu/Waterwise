import * as React from 'react';
import Svg, {
    Circle,
    Defs,
    G,
    Path,
    RadialGradient,
    Stop,
} from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Defs>
                <RadialGradient
                    id="a"
                    cx={-432.3551}
                    cy={19.3019}
                    fx={-432.3551}
                    fy={19.3019}
                    r={1}
                    gradientTransform="rotate(-46.009 -7686.43 -16694.924) scale(33.1225 26.6044)"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0.1093} stopColor="#4eccff" />
                    <Stop offset={1} stopColor="#00b2fb" />
                </RadialGradient>
                <RadialGradient
                    id="b"
                    cx={-402.9168}
                    cy={-10.4602}
                    fx={-402.9168}
                    fy={-10.4602}
                    r={0.9992}
                    gradientTransform="matrix(10.47189 13.19292 -2.98654 2.37056 4279.754 5356.113)"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0} stopColor="#fff" />
                    <Stop
                        offset={0.601}
                        stopColor="#bddbf1"
                        stopOpacity={0.28}
                    />
                    <Stop offset={1} stopColor="#5686f5" stopOpacity={0} />
                </RadialGradient>
                <RadialGradient
                    id="c"
                    cx={-431.98}
                    cy={8.2607}
                    fx={-431.98}
                    fy={8.2607}
                    r={1}
                    gradientTransform="rotate(-46.009 -18545.036 -42195.565) scale(83.4903 67.0605)"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0.1093} stopColor="#4eccff" />
                    <Stop offset={1} stopColor="#00b2fb" />
                </RadialGradient>
                <RadialGradient
                    id="d"
                    cx={-420.3012}
                    cy={-3.5495}
                    fx={-420.3012}
                    fy={-3.5495}
                    r={1.0004}
                    gradientTransform="rotate(51.559 -8997.452 18546.488) scale(42.4575 9.6111)"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0} stopColor="#fff" />
                    <Stop
                        offset={0.601}
                        stopColor="#bddbf1"
                        stopOpacity={0.28}
                    />
                    <Stop offset={1} stopColor="#5686f5" stopOpacity={0} />
                </RadialGradient>
            </Defs>
            <G
                style={{
                    isolation: 'isolate',
                }}
            >
                <Path
                    d="M102.745 24.572c0 9.108-7.383 16.491-16.491 16.491S69.763 33.68 69.763 24.572c0-8.168 5.57-13.557 13.62-21.66a4.066 4.066 0 015.752-.01c7.987 7.995 13.61 13.512 13.61 21.67z"
                    fill="url(#a)"
                />
                <G
                    style={{
                        mixBlendMode: 'screen',
                    }}
                    opacity={0.3}
                >
                    <Circle
                        cx={91.6946}
                        cy={15.6666}
                        r={15.6666}
                        fill="url(#b)"
                    />
                </G>
                <Path
                    d="M83.138 87.467c0 22.957-18.611 41.568-41.57 41.568S0 110.424 0 87.467c0-22.038 16.088-36.049 38.704-59.014a4.042 4.042 0 015.74-.012C66.875 51.05 83.139 65.44 83.139 87.467z"
                    fill="url(#c)"
                />
                <G
                    style={{
                        mixBlendMode: 'screen',
                    }}
                    opacity={0.3}
                >
                    <Circle
                        cx={55.2886}
                        cy={65.0195}
                        r={39.4902}
                        fill="url(#d)"
                    />
                </G>
            </G>
        </Svg>
    );
}

export default SvgComponent;
