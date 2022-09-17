import { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import logoTrace from '../../public/images/logo-trace.svg';
import logo from '../../public/images/logo.svg';
import './home.css'
import Vivus from 'vivus';

/**
 * Duration of the logo draw animation in milliseconds
 */
const animationDuration = 5500;

/**
 * Component for the home page
 * @param props properties for this component
 */
export default function Home(props: any) {

    const ref = useRef<HTMLObjectElement>(null);

    const [drawn, setDrawn] = useState(false);

    useEffect(() => {

        new Vivus(ref.current as HTMLElement, {
            duration: animationDuration,
            type: "oneByOne",
        }).stop().reset().play();

        new Promise(resolve => setTimeout(resolve, animationDuration)).then(() => {
            setDrawn(true);
        });
    }, []);

    let toDraw = drawn ? logo : logoTrace;

    return <>
        <div className="landing-screen">
            <object id="test" className="landing-logo" ref={ref} type="image/svg+xml" data={toDraw} />
        </div>
    </>;
}