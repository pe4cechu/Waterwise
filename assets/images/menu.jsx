import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Circle cx={12} cy={7} r={1} />
            <Circle cx={12} cy={12} r={1} />
            <Circle cx={12} cy={17} r={1} />
        </Svg>
    );
}

export default SvgComponent;
