import { useEffect, useRef, useState } from 'react';
import Vivus from 'vivus';
import logoTrace from '../../public/images/logo-trace.svg';
import './home.css';

/**
 * Duration of the logo draw animation in milliseconds
 */
const animationDuration = 5500;

/**
 * Time between text changes in milliseconds
 */
const textInterval = 5000;

/**
 * Time between backspaces in milliseconds
 */
const backspaceInterval = 75;

/**
 * Array of possible text options
 */
const textOptions: string[] = ["Aspiring Full Stack Developer", "University Of Toronto", "Computer Science", "Technology Enthusiast"];

/**
 * @param prevItem the previously selected item
 * @returns a random item from the text options
 */
function randomItem(prevItem: string | undefined = undefined) {
    let activeTextOptions = prevItem ? textOptions.filter(x => x !== prevItem) : textOptions;
    return activeTextOptions[Math.floor(Math.random() * activeTextOptions.length)];
}

/**
 * Component for the home page
 * @param props properties for this component
 */
export default function Home(props: any) {

    const [adding, setAdding] = useState(false);

    const ref = useRef<HTMLObjectElement>(null);

    const [selectedText, setSelectedText] = useState(randomItem());

    const [text, setText] = useState(selectedText);

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

    useEffect(() => {
        if (adding) {
            if (text === selectedText) {
                setTimeout(() => setAdding(false), textInterval);
            } else {
                setTimeout(() => setText(prev => selectedText.substring(0, prev.length + 1)), backspaceInterval);
            }
        } else {
            if (text.length === 0) {
                setTimeout(() => {
                    setSelectedText(randomItem(selectedText));
                    setAdding(true);
                }, backspaceInterval);
            } else {
                setTimeout(() => setText(prev => prev.substring(0, prev.length - 1)), backspaceInterval);
            }
        }
    }, [text, selectedText, adding]);
    return <>
        <div className="landing-screen">
            <object className="landing-logo" ref={ref} type="image/svg+xml" data={logoTrace}>
                Jacob Klimczak
            </object>
            <div className='cursor-text-container'>
                <span className='cursor-text'>{text}</span>
            </div>
        </div>
    </>;
}