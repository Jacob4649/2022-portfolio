import { Link } from "react-router-dom";
import UnderConstruction from "../../../navigation/underConstruction";
import KeyTechnologies from "../projectComponents/keyTechnologies";
import { backArrowPath } from "../projectComponents/projectWithSidebar";
import { TableOfContents, TableOfContentsItem } from "../projectComponents/tableOfContents";
import ProjectWithSidebar from '../projectComponents/projectWithSidebar';
import '../projectPages/projectPage.css';
import { useRef } from "react";
import cactusOfThingsLogo from '../../../../public/images/cactus-logo.svg';
import ResponsiveImageWithCaption from "../projectComponents/responsiveImageWithCaption";
import './cactusOfThings.css';
import cactusOfThingsPrototype from "../../../../public/images/project_assets/cactus_of_things/embedded-computer.jpg";

/**
 * Component for the cactus of things project
 * @param props properties for this component
 */
export default function CactusOfThings(props: any) {

    const overviewRef = useRef<HTMLSpanElement>(null);
    const componentsRef = useRef<HTMLSpanElement>(null);
    const embeddedRef = useRef<HTMLSpanElement>(null);
    const frontendRef = useRef<HTMLSpanElement>(null);
    const backendRef = useRef<HTMLSpanElement>(null);
    const cloudRef = useRef<HTMLSpanElement>(null);


    let sidebar = <>
        <TableOfContents className="contents">
            <TableOfContentsItem targetRef={overviewRef}>
                Overview
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={componentsRef}>
                Components
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={embeddedRef}>
                Embedded System
            </TableOfContentsItem>
        </TableOfContents>
        <KeyTechnologies projectId='cactus-of-things' className='key-technologies-container'>

        </KeyTechnologies>
    </>;

    return <ProjectWithSidebar sidebar={sidebar}>
        <h1>Cactus of Things</h1>
        <div className="shadow-box-container">

            <div className="shadow-box shadow-box-light">
                <ResponsiveImageWithCaption src={cactusOfThingsLogo} alt="Cactus of Things Logo" imageStyle={{
                    height: "auto",
                    width: "5rem"
                }}>
                    <span className='cactus-text'>CACTUS OF THINGS</span>
                    <br></br>
                    <a className='cactus-of-things-site-link' href='https://cactus-of-things-dashboard.web.app/' target="_blank" rel="noreferrer">
                        Dashboard
                    </a>
                </ResponsiveImageWithCaption>
            </div>

            <div className="shadow-box shadow-box-dark">
                <span className='section-title' ref={overviewRef}>Overview</span>
                This was a fun little side project of mine, meant to <b>help me water my cactus</b>. I'm not great with plants,
                and this was supposed to let me keep track of the amount of moisture in my cactus' soil, and eventually even
                automatically water the cactus.
            </div>


            <div className="shadow-box shadow-box-light">
                <span className='section-title' ref={componentsRef}>Components</span>
                The project has 3 key components:
                <ul>
                    <li>
                        The Embedded Sensor Array - An <b>ESP32</b> I programmed to periodically take a variety of sensor readings
                        and send these readings to my backend.
                    </li>
                    <li>
                        The Backend - A <b>Google Cloud Run</b> API written in <b>Go</b> that records information about the cactus in
                        a <b>Cloud Datastore</b> database, and sends it to API consumers on request.
                    </li>
                    <li>
                        The Frontend - A dashboard written in <b>React</b> and hosted with <b>Firebase</b> that displays information about
                        the cactus.
                    </li>
                </ul>
            </div>

            <div className="shadow-box shadow-box-dark">
                <span className='section-title' ref={embeddedRef}>Embedded System</span>
                The embedded system is run on an <b>ESP32</b> microcontroller, that I programmed in <b>C</b>. The code
                is pretty simple, once a minute, the microcontroller reads from several digital and analog signals, chiefly
                a digital photoresistor, and analog moisture sensor.
                <br></br>
                These readings are converted into appropriate units, and then sent to the API, where they will be stored.
                <ResponsiveImageWithCaption src={cactusOfThingsPrototype} alt="cactus of things prototype" imageStyle={{
                    borderRadius: "0.5rem"
                }}>
                    The first prototype of the embedded system running off my laptop.
                </ResponsiveImageWithCaption>
            </div>
        </div>
    </ProjectWithSidebar>;
}