import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                d="M15 19a1 1 0 01-.71-.29l-6-6a1 1 0 010-1.41l6-6a1 1 0 011.41 1.41L10.41 12l5.29 5.29A1 1 0 0115 19z"
                data-name={17}
            />
        </Svg>
    );
}

export default SvgComponent;
