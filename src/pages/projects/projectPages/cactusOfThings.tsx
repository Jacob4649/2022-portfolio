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

/**
 * Component for the cactus of things project
 * @param props properties for this component
 */
export default function CactusOfThings(props: any) {

    const overviewRef = useRef<HTMLSpanElement>(null);

    let sidebar = <>
        <TableOfContents className="contents">
            <TableOfContentsItem targetRef={overviewRef}>
                Overview
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
        </div>
    </ProjectWithSidebar>;
}