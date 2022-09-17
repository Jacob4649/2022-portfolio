import { useEffect, useRef, useState } from 'react';
import Vivus from 'vivus';
import logoTrace from '../../public/images/logo-trace.svg';
import './home.css';

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

    const [text, setText] = useState("Full Stack Developer");

    useEffect(() => {

        new Vivus(ref.current as HTMLElement, {
            duration: animationDuration,
            type: "oneByOne",
        }).stop().reset().play();

        new Promise(resolve => setTimeout(resolve, animationDuration)).then(() => {
            let svg = ref.current?.contentDocument?.querySelector('svg');

            if (svg) {
                svg.style.fill = "#fff";
                svg.style.fillOpacity = "100%";
                svg.style.transition = "0.2s all ease-in-out"
            }
        });
    }, []);

    return <>
        <div className="landing-screen">
            <object className="landing-logo" ref={ref} type="image/svg+xml" data={logoTrace} />
            <div className='cursor-text-container'>
                <span className='cursor-text'>{text}</span>
            </div>
        </div>
    </>;
}