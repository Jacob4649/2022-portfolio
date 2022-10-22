import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from '../../../../public/images/side-arrow.svg';
import './projectWithSidebar.css';

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

    /**
     * Classname for sidebar
     */
    sidebarClassname?: string;

    /**
     * Classname for content
     */
    contentClassname?: string;

    /**
     * Classname for body
     */
    bodyClassname?: string;
}

export const backArrowPath = "M.602 23.586a2.103 2.103 0 0 0 " +
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

    useEffect(() => {

        const body = document.querySelector('body') as HTMLBodyElement;

        if (props.bodyClassname)
            body.classList.add(props.bodyClassname)

        return () => {
            if (props.bodyClassname)
                body.classList.remove(props.bodyClassname);
        }
    }, [props.bodyClassname]);

    return <>
        <div className={props.sidebarClassname ?? "sidebar-dark sidebar"}>
            <div className="arrow-box">
                <img src={arrow} alt="arrow"></img>
            </div>
            <Link to="/projects" className="back-to-projects">
                <svg viewBox="0 0 50 50">
                    <path d={backArrowPath} />
                </svg>
                Projects
            </Link>
            {props.sidebar}
        </div>
        <div className={props.contentClassname ?? "content"}>
            {props.children}
        </div>
    </>;
}