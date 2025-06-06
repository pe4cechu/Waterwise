import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg
            fill="none"
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipRule="evenodd" fillRule="evenodd">
                <Path d="M9.425 10.254a.75.75 0 01.821.671l.5 5a.75.75 0 11-1.492.15l-.5-5a.75.75 0 01.671-.821zM14.575 10.254a.75.75 0 01.671.82l-.5 5a.75.75 0 11-1.492-.149l.5-5a.75.75 0 01.82-.671z" />
                <G>
                    <Path d="M10.124 1.25h3.381c.217 0 .405 0 .583.028a2.25 2.25 0 011.641 1.183c.083.16.143.339.211.544l.112.335.029.085a1.25 1.25 0 001.233.825h3a.75.75 0 110 1.5h-17a.75.75 0 010-1.5h3.09a1.25 1.25 0 001.173-.91l.112-.335c.068-.205.128-.384.211-.544a2.25 2.25 0 011.64-1.183c.179-.028.367-.028.584-.028zm-1.301 3a2.757 2.757 0 00.175-.428l.1-.3c.09-.273.112-.328.132-.368a.75.75 0 01.547-.395c.045-.007.104-.009.393-.009h3.29c.288 0 .347.002.392.01a.75.75 0 01.547.394c.02.04.041.095.133.369l.1.3.038.113c.04.108.085.213.137.314zM5.117 7.752a.75.75 0 01.798.698l.46 6.9c.09 1.347.154 2.285.294 2.99.137.685.327 1.047.6 1.303.274.256.648.422 1.34.512.713.093 1.654.095 3.004.095h.774c1.35 0 2.29-.002 3.004-.095.692-.09 1.066-.256 1.34-.512.273-.256.463-.618.6-1.303.14-.705.204-1.643.294-2.99l.46-6.9a.75.75 0 111.497.1l-.464 6.952c-.085 1.282-.154 2.318-.316 3.132-.169.845-.455 1.551-1.047 2.104-.591.554-1.315.793-2.17.904-.822.108-1.86.108-3.146.108h-.878c-1.286 0-2.324 0-3.146-.107-.855-.112-1.579-.351-2.17-.905-.592-.553-.878-1.26-1.047-2.104-.162-.814-.23-1.85-.316-3.132L4.418 8.55a.75.75 0 01.699-.798z" />
                </G>
            </G>
        </Svg>
    );
}

export default SvgComponent;
