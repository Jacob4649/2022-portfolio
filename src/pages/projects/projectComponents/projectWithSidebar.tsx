import { TableOfContents, TableOfContentsItem } from "./tableOfContents";
import './projectWithSidebar.css';
import { ReactNode } from "react";

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

/**
 * A project with a sidebar and some content
 * @param props properties for this component
 * @returns the created component
 */
export default function ProjectWithSidebar(props: ProjectWithSidebarProps) {
    return <>
        <div className="sidebar-dark sidebar">
            {props.sidebar}
        </div>
        <div className="content">
            {props.children}
        </div>
    </>;
}