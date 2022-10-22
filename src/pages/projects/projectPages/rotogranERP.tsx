import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Vivus from 'vivus';
import gearTrace from '../../../../public/images/project_assets/rotogran_erp/wrench-gear.svg';
import rotogranApp from '../../../../public/images/project_assets/rotogran_erp/transactions-screen.png';
import lock from '../../../../public/images/project_assets/rotogran_erp_android/lock.png';
import rotogranLogo from '../../../../public/images/rotogran-logo-small-outline.svg';
import '../../../App.css';
import KeyTechnologies from '../projectComponents/keyTechnologies';
import ProjectWithSidebar from '../projectComponents/projectWithSidebar';
import ResponsiveImageWithCaption from '../projectComponents/responsiveImageWithCaption';
import { TableOfContents, TableOfContentsItem } from '../projectComponents/tableOfContents';
import './projectPage.css';
import './rotogranERP.css';

/**
 * Component for the rotogran erp project
 * @param props properties for this component
 */
export default function RotogranERP(props: any) {
    const authRef = useRef<HTMLSpanElement>(null);
    const designRef = useRef<HTMLSpanElement>(null);
    const stackRef = useRef<HTMLSpanElement>(null);
    const stackDiagramRef = useRef<HTMLDivElement>(null);
    const achievementRef = useRef<HTMLSpanElement>(null);
    const roleRef = useRef<HTMLSpanElement>(null);
    const interfaceRef = useRef<HTMLSpanElement>(null);

    const wrenchGearRef = useRef<HTMLObjectElement>(null);
    const rotogranLogoRef = useRef<HTMLObjectElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const wrenchDuration = 2000;

        new Vivus(wrenchGearRef.current as HTMLElement, {
            duration: wrenchDuration,
            type: "oneByOne",
        }).stop().reset().play();

        const logoDuration = 3000;

        new Vivus(rotogranLogoRef.current as HTMLElement, {
            duration: logoDuration,
            type: "oneByOne"
        }).stop().reset().play();
    }, []);

    let sidebar = <>
        <TableOfContents className="contents">
            <TableOfContentsItem targetRef={achievementRef}>
                Achievements
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={roleRef}>
                My Role
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={stackRef}>
                Stack
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={stackDiagramRef}>
                Stack Diagram
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={interfaceRef}>
                Interface
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={authRef}>
                Authentication
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={designRef}>
                Graphic Design
            </TableOfContentsItem>
        </TableOfContents>
        <KeyTechnologies projectId='rotogran-erp' className='key-technologies-container'>

        </KeyTechnologies>
    </>;

    return <ProjectWithSidebar sidebar={sidebar} bodyClassname="rotogran-body"
        sidebarClassname='sidebar rotogran-sidebar'>
        <h1 className='shadow-box-light-clear'>ROTOGRAN ERP</h1>
        <div className="shadow-box-container">
            <div className='shadow-box shadow-box-light-clear'>
                <object className="rotogran-logo" ref={rotogranLogoRef} type="image/svg+xml" data={rotogranLogo}>
                    Rotogran Logo
                </object>
            </div>

            <div className="shadow-box shadow-box-dark-clear">
                <span className='rotogran-text'>ROTOGRAN INTERNATIONAL INC</span>
                <br></br>
                <a className='rotogran-site-link' href='https://rotogran.com/' target="_blank" rel="noreferrer">
                    Official Site
                </a>
            </div>

            <div className='shadow-box shadow-box-light-clear'>
                <span className="section-title" ref={achievementRef}>Achievements</span>
                Currently in <b>use</b> by Rotogran International Inc.
                <br></br><br></br>
                Tracks <b>more than 2500</b> incoming &amp; outgoing items.
                <br></br><br></br>
                Manages more stock for <b>over 300 types of items</b> in <b>7 categories</b>.
                <br></br><br></br>
                Has tracked <b>over 200 work orders</b> &amp; a similar number of <b>parts orders</b>.
                <br></br><br></br>
                Manages <b>tasks</b> for approximately <b>40 personnel</b>.
                <br></br><br></br>
                <b>Google Calendar</b> &amp; <b>Outlook</b> Integration
                <br></br><br></br>
                <b>Weekly Reports</b> On Low Stock Items
            </div>

            <div className='shadow-box shadow-box-dark-clear'>
                <span className='section-title' ref={roleRef}>My Role</span>
                I was an integral member of the team for this project. I worked closesly with various departments to ensure this
                application could be implemented and would not interfere with existing workflows, <b>designed and developed</b> key
                subsystems, and made use of <b>modern software tooling</b> and <b>DevOps</b> practices over the course of this project.
                I contributed to this project at every level, not just to every part of the stack, but also in terms of the design,
                direction, and conceptual development of this software suite.
            </div>

            <div className='shadow-box shadow-box-dark-clear'>
                <span className='section-title' ref={stackRef}>Stack</span>
                The stack included a wide variety of technologies. The backend was built primarily in <b>C#</b>,
                and also made use of some small <b>Lua</b> scripts. A <b>Microsoft SQL Server</b> database was used as the
                primary means of storing persistent data, although other tools were also used in certain scenarios.
                <br></br><br></br>
                I created an <b>extensible framework</b> for receiving, parsing, executing, and responding 
                to <b>requests</b> from client applications. This framework allowed for the easy addition of new
                requests and responses to the backend.
                <br></br><br></br>
                Communication between the backend and client applications was faciiltated by a custom <b>duplex communication protocol</b> built over <b>TCP/IP</b>, and  optimized for
                low latency and security in the context of the ERP application; which I developed.
                <br></br><br></br>
                I developed client libraries for <b>Java</b> and <b>C#</b> allowing frontend applications to interact with the backend
                easily.
                <br></br><br></br>
                I also worked on client applications for <b>Windows</b>, <b>Android</b> (Using the <b>Android SDK</b>) and certain
                embedded systems (Using <b>Java</b>).
            </div>

            <div className='shadow-box shadow-box-light-clear' ref={stackDiagramRef}>
                <div className='rotogran-stack-diagram'>
                    <table>
                        <tr>
                            <td className='windows-client'>
                                Windows Client
                            </td>
                            <td className='android-client'>
                                Android Client
                            </td>
                            <td className='embedded-systems'>
                                Embedded Systems
                            </td>
                        </tr>
                        <tr>
                            <td className='csharp-client-library'>
                                C# Client Library
                            </td>
                            <td colSpan={2} className='java-client-library'>
                                Java Client Library
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className='communication-protocol'>
                                Custom TCP/IP Communication Protocol
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className='server'>
                                Custom Server Framework
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className='database'>
                                Microsoft SQL Server
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div className='shadow-box rotogran-interface-example'>
                <span ref={interfaceRef} className='section-title'>Interface</span>
                <img src={rotogranApp} alt="transactions screen" className='center-image'></img>
                <br></br>
                An example of the Windows client application interface.
            </div>

            <div className='shadow-box shadow-box-light-clear'>
                <ResponsiveImageWithCaption className="lock-image" src={lock} alt="lock" imageStyle={{
                    width: 'auto',
                    height: '3em'
                }}>
                    <span className='section-title' ref={authRef}>Authentication</span>
                </ResponsiveImageWithCaption>
                I implemented a <b>session authentication</b> system for the application. Users can authenticate with their
                username and password, and have varying levels of permission, as specified by an administrator. Passwords are <b>salted and hashed</b> before 
                they are sent from the client, and the salted hashes are <b>encrypted</b> once in the database. While this type of care around passwords
                should be standard, every so often multi-billion dollar companies 
                like <a className='adobe-link' href="https://en.wikipedia.org/wiki/List_of_data_breaches" target="_blank" rel="noreferrer">Adobe</a> show us that it is not.
            </div>

            <div className='shadow-box shadow-box-dark-clear graphic-design'>
                <span className='section-title' ref={designRef}>Graphic Design</span>
                <object className="wrench-gear-logo" ref={wrenchGearRef} type="image/svg+xml" data={gearTrace}>
                    An icon I created during my time working on the project
                </object>
                At Rotogran, I was given the opportunity to contribute to a significant amount of the <b>graphic design</b> involved in this
                project. Here you can see an example of one of the <b>icons I created</b>.
            </div>

            <div className="shadow-box shadow-box-dark see-also hover-box" onClick={() => navigate('/projects/rotogran-erp-android')}>
                <span className='section-title'>See Also</span>
                <i>Android Client</i>
            </div>
        </div>
    </ProjectWithSidebar >;
}