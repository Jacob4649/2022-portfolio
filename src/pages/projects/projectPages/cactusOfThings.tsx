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
import githubLogo from "../../../../public/images/github-logo-white.svg";
import wifiTesting from "../../../../public/images/project_assets/cactus_of_things/embedded-wifi-testing.jpg";
import dashboard from "../../../../public/images/project_assets/cactus_of_things/dashboard.png";
import running from "../../../../public/images/project_assets/cactus_of_things/embedded-draft.jpg";

/**
 * Component for the cactus of things project
 * @param props properties for this component
 */
export default function CactusOfThings(props: any) {

    const overviewRef = useRef<HTMLSpanElement>(null);
    const componentsRef = useRef<HTMLSpanElement>(null);
    const embeddedRef = useRef<HTMLSpanElement>(null);
    const backendRef = useRef<HTMLSpanElement>(null);
    const frontendRef = useRef<HTMLSpanElement>(null);
    const cloudRef = useRef<HTMLSpanElement>(null);
    const futureRef = useRef<HTMLSpanElement>(null);


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
            <TableOfContentsItem targetRef={backendRef}>
                Backend
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={frontendRef}>
                Frontend
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={futureRef}>
                Future Plans
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={cloudRef}>
                Google Cloud
            </TableOfContentsItem>
        </TableOfContents>
        <KeyTechnologies projectId='cactus-of-things' className='key-technologies-container'>

        </KeyTechnologies>
    </>;

    return <ProjectWithSidebar sidebar={sidebar}
        bodyClassname="cactus-body">
        <h1>Cactus of Things</h1>
        <div className="shadow-box-container">

            <div className="shadow-box shadow-box-cactus">
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

            <div className="shadow-box shadow-box-cactus-light">
                <span className='section-title' ref={embeddedRef}>Embedded System</span>
                The embedded system is run on an <b>ESP32</b> microcontroller, that I programmed in <b>C</b>. The code
                is pretty simple, once a minute, the microcontroller reads from several digital and analog signals, chiefly
                a digital photoresistor, and analog moisture sensor.
                <br></br><br></br>
                These readings are converted into appropriate units, and then sent to the API, where they will be stored.
                <ResponsiveImageWithCaption src={cactusOfThingsPrototype} alt="cactus of things prototype" imageStyle={{
                    borderRadius: "0.5rem",
                    marginTop: "0.5rem"
                }}>
                    The first prototype of the embedded system running off my laptop.
                </ResponsiveImageWithCaption>
            </div>

            <div className="shadow-box shadow-box-dark cactus-image-container">
                <img src={wifiTesting} alt="wifi connecting image" style={{
                    borderRadius: "0.5rem",
                    width: "100%"
                }} />
                First time the ESP32 connected to WiFi
            </div>

            <div className="shadow-box shadow-box-light">
                <span className='section-title' ref={backendRef}>Backend</span>
                The app uses a simple <b>REST API</b> for its backend. The API is built in <b>Go</b>, with <b>microservice architecture</b> in mind,
                and is served by <b>Google Cloud Run</b>.
                <br></br><br></br>
                The backend uses a <b>Cloud Datastore non-relational database</b> to store sensor readings. The readings
                have a TTL policy of one month to avoid incurring large storage costs.
                <br></br><br></br>
                <b>Cloud Run</b> executes a <b>Docker</b> container containing the application, which enables
                greater portability and ease of management.
            </div>

            <div className="shadow-box shadow-box-cactus">
                <span className='section-title' ref={frontendRef}>Frontend</span>
                The dashboard for the app built with <b>React</b> and <b>TypeScript</b>. It is a single page app using <b>React Router</b>,
                and makes use of the API I built to retrieve information about the cactus.
                <br></br><br></br>
                The dashboard displays the cactus' moisture level, as well as the light conditions it is in. This has the
                incidental effect of making the dashboard an excellent tracker of my sleep schedule. Charts for the dashboard are made in ReCharted.
                <div className="cactus-image-container">
                    <img src={dashboard} alt="cactus of things dashboard" style={{
                        borderRadius: "0.5rem",
                        width: "100%",
                        marginTop: "0.5rem"
                    }} />
                    Early version of the dashboard.
                </div>
            </div>

            <div className="shadow-box shadow-box-light">
                <span className='section-title' ref={futureRef}>Future Plans</span>
                Currently, I am in the process of adding various functionalities to the dashboard. Right now, I am working towards
                having the backend detect when the cactus has been watered, and then having the dashboard display these times
                with raindrops or something similar. Eventually I would also like to be able to water my cactus by clicking a button
                on the dashboard, and triggering a pump.
            </div>

            <div className="shadow-box shadow-box-dark cactus-image-container">
                <img src={running} alt="running cactus image" style={{
                    borderRadius: "0.5rem",
                    width: "auto",
                    height: "100%",
                    maxHeight: "30rem"
                }} />
                The whole system, finally up and running.
            </div>

            <div className="shadow-box shadow-box-cactus-light">
                <span className='section-title' ref={cloudRef}>Google Cloud</span>
                I elected to build this project in <b>Google Cloud</b> for several reasons. First, I had never used <b>GCP</b> prior
                to this, and decided I wanted to learn. The cost was also a major factor. I love <b>AWS</b>, but frankly, I don't think the free
                tier would have supported this project. On <b>Google Cloud</b>, this costs me $0.48 a month.
                <br></br><br></br>
                Now onto more technical reasons. <b>Cloud Run</b> is very similar to <b>AWS Lambda</b>, and <b>Cloud Datastore</b> is very
                similar to <b>DynamoDB</b>, so are there any technical reasons I might prefer Google's offerings? <b>Yes!</b>
                <br></br><br></br>
                Configuration for Google's Cloud products is much simpler than for Amazon's. In <b>Lambda</b>, I would have had
                to: configure an <b>API Gateway</b>, define triggers for <b>Lambda</b> functions, configure layers for my
                <b>Lambda</b> functions, and probably fumble around trying to remember how <b>Lambda</b> parses HTTP requests into <b>Lambda</b> events.
                <br></br><br></br>
                I have the option to do all of that on <b>Cloud Run</b>, but I can also just setup a <b>Docker container</b> to run my backend, and
                it just works. No need to implement special <b>Cloud Run</b> specific infrastructure, I can receive raw HTTP requests, and respond
                accordingly.
            </div>

            <div className="shadow-box shadow-box-dark">
                <ResponsiveImageWithCaption src={githubLogo} alt="github logo" imageStyle={{
                    borderRadius: "0.5rem"
                }}>
                    <a className='cactus-of-things-site-link' href='https://github.com/Jacob4649/cactus-of-things-embedded' target="_blank" rel="noreferrer">
                        Embedded
                    </a>
                    <br></br>
                    <a className='cactus-of-things-site-link' href='https://github.com/Jacob4649/cactus-of-things-backend' target="_blank" rel="noreferrer">
                        Backend
                    </a>
                    <br></br>
                    <a className='cactus-of-things-site-link' href='https://github.com/Jacob4649/cactus-of-things-dashboard' target="_blank" rel="noreferrer">
                        Frontend
                    </a>
                </ResponsiveImageWithCaption>
            </div>
        </div>
    </ProjectWithSidebar>;
}