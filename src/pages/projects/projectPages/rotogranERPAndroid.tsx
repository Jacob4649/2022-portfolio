import { Link } from 'react-router-dom';
import './rotogranERPAndroid.css';

/**
 * Component for the rotogran erp android project
 * @param props properties for this component
 */
export default function RotogranERPAndroid(props: any) {
    return <>
        <h1>ROTOGRAN ERP ANDROID</h1>
        <div className="technologies">
            <div className='table-of-contents'>
                <span className='contents-title'>Contents</span>
                <Link to="#features">Features</Link>
            </div>
        </div>
        <div className="writeup">
            I spearheaded the conception and development of this ERP app for Rotogran International Inc.
            <span className='section-title' id="features">Features</span>
            <ul>
                <li>User authentication and management, robust permissions system</li>
                <li>Easy access to all work orders, past and present</li>
                <li>Manage active tasks, and task queues for all workers</li>
                <li>Track current inventory, view low stock items</li>
                <li>Show parts orders, and their status (i.e. how far from completion, shipping status, what parts are bottlenecks, etc...)</li>
                <li>UI and UX mirroring aspects of desktop client</li>
            </ul>
            The application enabled easy, on-the-go access to all work orders, past and present.
        </div>
    </>;
}