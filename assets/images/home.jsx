import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <G data-name="Layer 2">
                <Path d="M19 23H5a4 4 0 01-4-4V9.7a4 4 0 011.94-3.43l7-4.2a4 4 0 014.12 0l7 4.2A4 4 0 0123 9.7V19a4 4 0 01-4 4zM4 8a2 2 0 00-1 1.7V19a2 2 0 002 2h14a2 2 0 002-2V9.7A2 2 0 0020 8l-7-4.2a2 2 0 00-2.06 0z" />
                <Path d="M20.54 7.13l-7-4.2a3 3 0 00-3.08 0l-7 4.2A3 3 0 002 9.7V19a3 3 0 003 3h14a3 3 0 003-3V9.7a3 3 0 00-1.46-2.57zm-4.74 9.13a4 4 0 01-7.6 0 1 1 0 011-1.26 1 1 0 01.95.63 2 2 0 003.8 0 1 1 0 01.95-.63 1 1 0 01.9 1.26z" />
            </G>
        </Svg>
    );
}

export default SvgComponent;
