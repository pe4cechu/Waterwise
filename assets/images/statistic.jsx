import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg
            height={24}
            viewBox="0 0 32 32"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M7 12H5c-1.7 0-3 1.3-3 3v12c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3V15c0-1.7-1.3-3-3-3zM17 2h-2c-1.7 0-3 1.3-3 3v22c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3zM27 7h-2c-1.7 0-3 1.3-3 3v17c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3V10c0-1.7-1.3-3-3-3z" />
        </Svg>
    );
}

export default SvgComponent;
