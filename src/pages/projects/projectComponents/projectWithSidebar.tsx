import { ReactNode } from "react";
import './projectWithSidebar.css';
import { Link } from "react-router-dom";

/**
 * Properties for a ProjectWithSidebar
 */
interface ProjectWithSidebarProps {

    /**
     * Children for sidebar
     */
    sidebar: ReactNode;

    /**
     * Children for outside of sidebar
     */
    children: ReactNode;
}

const backArrowPath = "M.602 23.586a2.103 2.103 0 0 0 " +
    ".014 2.958l22.84 22.84a2.102 2.102 0 0 0 2.974 0 " +
    "2.102 2.102 0 0 0 0-2.973L7.166 27.147l40.737-.10" +
    "2A2.102 2.102 0 0 0 50 24.938a2.102 2.102 0 0 0-2" +
    ".107-2.097l-45.796.113a2.103 2.103 0 0 0-1.495.63" +
    "2zm.014-.016a2.103 2.103 0 0 0 1.492 3.59l45.795-" +
    ".115A2.102 2.102 0 0 0 50 24.938a2.102 2.102 0 0 " +
    "0-2.107-2.097l-40.701.1L26.544 3.59a2.102 2.102 0" +
    " 0 0 0-2.973 2.102 2.102 0 0 0-2.974 0z";

/**
 * A project with a sidebar and some content
 * @param props properties for this component
 * @returns the created component
 */
export default function ProjectWithSidebar(props: ProjectWithSidebarProps) {
    return <>
        <div className="sidebar-dark sidebar">
            <Link to="/projects" className="back-to-projects">
                <svg viewBox="0 0 50 50">
                    <path d={backArrowPath} />
                </svg>
                Projects
            </Link>
            {props.sidebar}
        </div>
        <div className="content">
            {props.children}
        </div>
    </>;
}