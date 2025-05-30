import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg
            height={512}
            viewBox="0 0 24 24"
            width={512}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G data-name="Layer 2">
                <Path d="M12 3.25A9.75 9.75 0 1021.75 13 9.761 9.761 0 0012 3.25zm4.671 12.085a.75.75 0 01-.671.415.741.741 0 01-.334-.079l-4-2A.749.749 0 0111.25 13V8a.75.75 0 011.5 0v4.536l3.585 1.793a.75.75 0 01.336 1.006zM6 1a1 1 0 00-.6.2l-4 3a1 1 0 001.2 1.6l4-3A1 1 0 006 1zM22.6 4.2l-4-3A.987.987 0 0018 1a1 1 0 00-.6 1.8l4 3a.985.985 0 00.6.2 1 1 0 00.6-1.8z" />
            </G>
        </Svg>
    );
}

export default SvgComponent;
