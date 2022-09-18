import { useRef } from 'react';
import './rotogranERPAndroid.css';
import './projectPage.css';
import homeScreen from '../../../../public/images/project_assets/rotogran_erp_android/home-screen.png';
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

    let sidebar = <>
        <TableOfContents>
            <TableOfContentsItem targetRef={featuresRef}>
                Features
            </TableOfContentsItem>
        </TableOfContents>
        <KeyTechnologies projectId='rotogran-erp-android' className='key-technologies-container'>

        </KeyTechnologies>
    </>;

    return <ProjectWithSidebar sidebar={sidebar}>
        <h1>ROTOGRAN ERP ANDROID</h1>
        I spearheaded the conception and development of this ERP app for Rotogran International Inc.
        <div className="shadow-box-container">
            <div className='shadow-box shadow-box-light'>
                <span className='section-title' ref={featuresRef}>Features</span>
                <ul>
                    <li>User authentication and management, robust permissions system</li>
                    <li>Easy access to all work orders, past and present</li>
                    <li>Manage active tasks, and task queues for all workers</li>
                    <li>Track current inventory, view low stock items</li>
                    <li>Show parts orders, and their status (i.e. how far from completion, shipping status, what parts are bottlenecks, etc...)</li>
                    <li>UI and UX mirroring aspects of desktop client</li>
                </ul>
            </div>
            <div className='shadow-box shadow-box-light'>
                <ResponsiveImageWithCaption src={homeScreen} alt="home screen">
                    This is some text
                </ResponsiveImageWithCaption>
            </div>
        </div>
        The application enabled easy, on-the-go access to all work orders, past and present.
    </ProjectWithSidebar>;
}