import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G data-name="Layer 2">
                <Path d="M16 22H8a3 3 0 01-2.6-1.5l-4-7a3 3 0 010-3l4-7A3 3 0 018 2h8a3 3 0 012.6 1.5l4 7a3 3 0 010 3l-4 7A3 3 0 0116 22zM8 4a1 1 0 00-.87.5l-4 7a1 1 0 000 1l4 7A1 1 0 008 20h8a1 1 0 00.87-.5l4-7a1 1 0 000-1l-4-7A1 1 0 0016 4z" />
                <Path d="M21.82 11l-4.05-7A2 2 0 0016 3H8a2 2 0 00-1.77 1l-4.05 7a2 2 0 000 2l4.05 7A2 2 0 008 21h8a2 2 0 001.73-1l4.05-7a2 2 0 00.04-2zM12 15a3 3 0 113-3 3 3 0 01-3 3z" />
            </G>
        </Svg>
    );
}

export default SvgComponent;
