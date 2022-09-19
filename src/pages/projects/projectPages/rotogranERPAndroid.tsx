import { useRef } from 'react';
import './rotogranERPAndroid.css';
import './projectPage.css';
import rotogranLogo from '../../../../public/images/rotogran-logo.png';
import rotogranApp from '../../../../public/images/project_assets/rotogran_erp_android/home-screen.png';
import lock from '../../../../public/images/project_assets/rotogran_erp_android/lock.png';
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
    const androidRef = useRef<HTMLSpanElement>(null);
    const authRef = useRef<HTMLSpanElement>(null);

    let sidebar = <>
        <TableOfContents className="contents">
            <TableOfContentsItem targetRef={featuresRef}>
                Features
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={myInvolvementRef}>
                My Involvement
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={androidRef}>
                Android
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={authRef}>
                Authentication
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
            <div className='shadow-box shadow-box-app-home-screen'>
                <span className='section-title' ref={androidRef}>Android</span>
                <ResponsiveImageWithCaption src={rotogranApp} alt="home screen" imageStyle={{
                    "border-radius": "0.5rem"
                }}>
                    This application was built with the Android SDK.
                    It makes extensive use of many elements of the SDK including fragments,
                    MVVM patterns, and the activity result flow.
                </ResponsiveImageWithCaption>
            </div>
            <div className='shadow-box shadow-box-light'>
                <ResponsiveImageWithCaption className="lock-image" src={lock} alt="lock" imageStyle={{
                    width: 'auto',
                    height: '3em'
                }}>
                    <span className='section-title' ref={authRef}>Authentication</span>
                </ResponsiveImageWithCaption>
                Users are able to authenticate using their account name and password.
                Accounts have varying levels of permissions, with administrative accounts being able to reset any user's password.
            </div>
        </div>
    </ProjectWithSidebar >;
}