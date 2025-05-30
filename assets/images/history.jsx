import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm3.553 12.895l-4-2A1 1 0 0111 12V7a1 1 0 012 0v4.382l3.447 1.723a1 1 0 01-.894 1.79z" />
        </Svg>
    );
}

export default SvgComponent;
