import { useRef } from 'react';
import './rotogranERPAndroid.css';
import './projectPage.css';
import rotogranLogo from '../../../../public/images/rotogran-logo.png';
import ResponsiveImageWithCaption from '../projectComponents/responsiveImageWithCaption';
import { TableOfContents, TableOfContentsItem } from '../projectComponents/tableOfContents';
import ProjectWithSidebar from '../projectComponents/projectWithSidebar';
import KeyTechnologies from '../projectComponents/keyTechnologies';

/**
 * Component for the rotogran erp android project
 * @param props properties for this component
 */
export default function RotogranERPAndroid(props: any) {
    const featuresRef = useRef<HTMLSpanElement>(null);
    const myInvolvementRef = useRef<HTMLSpanElement>(null);

    let sidebar = <>
        <TableOfContents className="contents">
            <TableOfContentsItem targetRef={featuresRef}>
                Features
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={myInvolvementRef}>
                My Involvement
            </TableOfContentsItem>
        </TableOfContents>
        <KeyTechnologies projectId='rotogran-erp-android' className='key-technologies-container'>

        </KeyTechnologies>
    </>;

    return <ProjectWithSidebar sidebar={sidebar}>
        <h1>ROTOGRAN ERP ANDROID</h1>
        <div className="shadow-box-container">
            <div className="shadow-box shadow-box-dark">
                <ResponsiveImageWithCaption src={rotogranLogo} alt="Rotogran Logo" imageStyle={{
                    height: "auto",
                    width: "5rem"
                }}>
                    <span className='rotogran-text'>ROTOGRAN INTERNATIONAL INC</span>
                    <br></br>
                    <a className='rotogran-site-link' href='https://rotogran.com/' target="_blank" rel="noreferrer">
                        Official Site
                    </a>
                </ResponsiveImageWithCaption>
            </div>
            <div className='shadow-box shadow-box-light'>
                <span className='section-title' ref={featuresRef}>Features</span>
                User authentication and management, robust permissions system
                <br></br>
                Easy access to all work orders, past and present
                <br></br>
                Manage active tasks, and task queues for all workers
                <br></br>
                Track current inventory, view low stock items
                <br></br>
                Show parts orders, and their status (i.e. how far from completion, shipping status, what parts are bottlenecks, etc...)
                <br></br>
                UI and UX mirroring aspects of desktop client
            </div>
            <div className='shadow-box shadow-box-light'>
                <span className='section-title' ref={myInvolvementRef}>My Involvement</span>
                I spearheaded the conception and development of this ERP app for Rotogran International Inc.
                The application enabled easy, on-the-go access to all work orders, past and present.
            </div>
        </div>
    </ProjectWithSidebar >;
}