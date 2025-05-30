import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.001 512.001"
            xmlSpace="preserve"
            transform="translate(2, 0)" // Move 10 units to the right
            {...props}
        >
            <Path d="M406.94 95.674h-33.852V50.65H0v264.94c0 80.373 65.388 145.761 145.761 145.761h81.567c80.373 0 145.761-65.388 145.761-145.761v-9.796h33.852c57.93 0 105.06-47.13 105.06-105.061C512 142.804 464.87 95.674 406.94 95.674zm0 150.12h-33.852v-90.12h33.852c24.846 0 45.06 20.214 45.06 45.061 0 24.846-20.214 45.059-45.06 45.059z" />
        </Svg>
    );
}

export default SvgComponent;
