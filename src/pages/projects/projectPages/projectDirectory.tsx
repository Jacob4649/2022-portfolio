import { ReactNode } from "react";
import { ProjectThumbnail } from "../projects";
import CodeNinjasTracker from "./codeNinjasTracker";
import codeNinjas from '../../../../public/images/white-belt-512.png';

/**
 * Represents a project on this portfolio
 */
class Project {

    /**
     * Component to display when viewing the project
     */
    component: ReactNode;

    /**
     * Thumbnail to show when browsing through projects
     */
    thumbnail: ReactNode;

    /**
     * ID to assign this project
     */
    id: string;

    /**
     * Creates a new Project
     * @param id id for the project
     * @param component page component for the project
     * @param thumbnail thumbnail for the project
     */
    constructor(id: string, component: ReactNode, thumbnail: ReactNode) {
        this.id = id;
        this.component = component;
        this.thumbnail = thumbnail;
    }

}

/**
 * Directory of all projects on this site
 */
const directory: Project[] = [
    new Project('code-ninjas-session-tracker', <CodeNinjasTracker />,
        <ProjectThumbnail projectId='code-ninjas-session-tracker' title='Session Tracker'
            subheading='Tracks Customer Sessions For Code Ninjas Mississauga West'
            content='Built in React with JavaScript, using Firebase for database.'
            image={codeNinjas}></ProjectThumbnail>)
];

export default directory;