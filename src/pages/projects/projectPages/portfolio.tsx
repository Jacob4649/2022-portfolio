import { Link } from "react-router-dom";
import UnderConstruction from "../../../navigation/underConstruction";
import { backArrowPath } from "../projectComponents/projectWithSidebar";
import '../projectPages/projectPage.css';

/**
 * Component for the portfolio project
 * @param props properties for this component
 */
export default function Portfolio(props: any) {
    return <>
        <UnderConstruction>
            <Link to="/projects" className="back-to-projects-construction">
                <svg viewBox="0 0 50 50">
                    <path d={backArrowPath} />
                </svg>
                Projects
            </Link>
        </UnderConstruction>
    </>;
}