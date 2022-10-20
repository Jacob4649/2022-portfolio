import { useEffect, useRef } from 'react';
import './rotogranERP.css';
import './projectPage.css';
import '../../../App.css';
import rotogranLogo from '../../../../public/images/rotogran-logo.png';
import rotogranApp from '../../../../public/images/project_assets/rotogran_erp_android/home-screen.png';
import gearTrace from '../../../../public/images/project_assets/rotogran_erp/wrench-gear.svg';
import lock from '../../../../public/images/project_assets/rotogran_erp_android/lock.png';
import workOrder from '../../../../public/images/project_assets/rotogran_erp_android/work-order.png';
import partsOrders from '../../../../public/images/project_assets/rotogran_erp_android/parts-orders.png';
import workOrderReport from '../../../../public/images/project_assets/rotogran_erp_android/work-order-report.png';
import inventory from '../../../../public/images/project_assets/rotogran_erp_android/inventory.png';
import ResponsiveImageWithCaption from '../projectComponents/responsiveImageWithCaption';
import { TableOfContents, TableOfContentsItem } from '../projectComponents/tableOfContents';
import ProjectWithSidebar from '../projectComponents/projectWithSidebar';
import KeyTechnologies from '../projectComponents/keyTechnologies';
import { Link, useNavigate } from 'react-router-dom';
import Vivus from 'vivus';

/**
 * Component for the rotogran erp project
 * @param props properties for this component
 */
export default function RotogranERP(props: any) {
    const androidRef = useRef<HTMLSpanElement>(null);
    const authRef = useRef<HTMLSpanElement>(null);
    const queueRef = useRef<HTMLSpanElement>(null);
    const workOrderRef = useRef<HTMLSpanElement>(null);
    const summaryRef = useRef<HTMLSpanElement>(null);
    const inventoryRef = useRef<HTMLSpanElement>(null);
    const achievementRef = useRef<HTMLSpanElement>(null);
    const roleRef = useRef<HTMLSpanElement>(null);

    const wrenchGearRef = useRef<HTMLObjectElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        new Vivus(wrenchGearRef.current as HTMLElement, {
            duration: 2000,
            type: "oneByOne",
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
            <TableOfContentsItem targetRef={queueRef}>
                Work Queue
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={androidRef}>
                Android
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={summaryRef}>
                Summaries
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={inventoryRef}>
                Inventory
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={workOrderRef}>
                Work Orders
            </TableOfContentsItem>
            <TableOfContentsItem targetRef={authRef}>
                Authentication
            </TableOfContentsItem>
        </TableOfContents>
        <KeyTechnologies projectId='rotogran-erp' className='key-technologies-container'>

        </KeyTechnologies>
    </>;

    return <ProjectWithSidebar sidebar={sidebar} bodyClassname="rotogran-body"
        sidebarClassname='sidebar rotogran-sidebar'>
        <h1 className='shadow-box-light-clear'>ROTOGRAN ERP</h1>
        <div className="shadow-box-container">
            <div className="shadow-box shadow-box-dark-clear">
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

            <div className='shadow-box shadow-box-dark'>
                <span className='section-title' ref={roleRef}>My Role</span>

            </div>

            <div className='shadow-box shadow-box-dark'>
                <span className='section-title' ref={queueRef}>Work Queue</span>
                <object className="wrench-gear-logo" ref={wrenchGearRef} type="image/svg+xml" data={gearTrace}>
                    Jacob Klimczak
                </object>
            </div>

            <div className='shadow-box shadow-box-app-home-screen'>
                <span className='section-title' ref={androidRef}>Android</span>
                <ResponsiveImageWithCaption src={rotogranApp} alt="home screen" imageStyle={{
                    borderRadius: "0.5rem"
                }}>
                    This application was built with the <b>Android SDK</b>.
                    It makes extensive use of many elements of the SDK including <b>fragments</b>, <b>MVVM patterns</b>, and
                    the <b>activity result flow</b>.
                </ResponsiveImageWithCaption>
            </div>

            <div className='shadow-box shadow-box-dark'>
                <span className='section-title' ref={summaryRef}>Summaries</span>
                Information is available to the user in various formats.
                One of the most common formats is a <b>summary</b>&#x2014;a grid layout similar to an excel sheet
                where important fields are laid out into their own columns. This visualization is used for
                everything from <b>inventory</b> counts to incoming and outgoing <b>parts orders</b> to current <b>tasks</b>.
                <img src={partsOrders} alt="summary example" className='center-image'></img>
            </div>

            <div className='shadow-box shadow-box-app-inventory'>
                <span className='section-title' ref={inventoryRef}>Inventory</span>
                <ResponsiveImageWithCaption src={inventory} alt="inventory" imageStyle={{
                    borderRadius: "0.5rem"
                }}>
                    This project also makes it easy to keep track of <b>inventory</b>.
                    Inventory can be viewed either by <b>item</b>, or in a summary view. Items are also
                    broken down into different <b>categories</b>. Users are <b>alerted by email</b> when items fall
                    below their set <b>minimum stock</b>.
                </ResponsiveImageWithCaption>
            </div>

            <div className='shadow-box shadow-box-app-home-screen'>
                <span ref={workOrderRef} className='section-title'>Work Orders</span>
                <ResponsiveImageWithCaption src={workOrder} alt="work order" imageStyle={{
                    borderRadius: "0.5rem"
                }}>
                    <b>Work orders</b>&#x2014;orders for machines that must be assembled then delivered to a customer&#x2014;are tracked
                    by the system. They can be viewed either by order, or in a <b>summary</b> with information about their <b>status</b>, <b>shipping</b>, and more.
                    Each order in the system contains a detailed breakdown of all the different <b>components</b> that must be assembled, and to what <b>specifications</b> those
                    components should be made.
                </ResponsiveImageWithCaption>
                <img src={workOrderReport} alt="work order summary" className='center-image'></img>
            </div>

            <div className='shadow-box shadow-box-light'>
                <ResponsiveImageWithCaption className="lock-image" src={lock} alt="lock" imageStyle={{
                    width: 'auto',
                    height: '3em'
                }}>
                    <span className='section-title' ref={authRef}>Authentication</span>
                </ResponsiveImageWithCaption>
                Users are able to authenticate using their account name and password.
                Accounts have varying levels of permissions.
                Authentication is through a proprietary implementation.
                Passwords are salted, and hashed with <b>SHA-256</b>. No part of the password is ever sent over the network.
            </div>

            <div className="shadow-box shadow-box-dark see-also hover-box" onClick={() => navigate('/projects/rotogran-erp-android')}>
                <span className='section-title'>See Also</span>
                <i>Android Client</i>
            </div>
        </div>
    </ProjectWithSidebar >;
}