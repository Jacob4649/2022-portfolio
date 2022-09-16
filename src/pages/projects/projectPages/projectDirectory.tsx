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
     * All the tags this project should have
     */
    tags: string[];

    /**
     * Creates a new Project
     * @param id id for the project
     * @param component page component for the project
     * @param thumbnail thumbnail for the project
     * @param tags all the tags this project should have
     */
    constructor(id: string, component: ReactNode, thumbnail: ReactNode, tags: string[] = []) {
        this.id = id;
        this.component = component;
        this.thumbnail = thumbnail;
        this.tags = tags;
    }

    /**
     * 
     * @returns whether this project has tags
     */
    hasTags = () => this.tags.length > 0;

    /**
     * 
     * @returns the tag component for this directory
     */
    TagComponent = (props: any) => <div className={props.className}>
        {this.tags.map(x => <img src={tagsBundle[x]}></img>)}
    </div>;

}

/**
 * Bundle of all the different tags projects can have
 */
const tagsBundle: { [key: string]: string } = {
    firebase: "https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white",
    react: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    typeScript: "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
    javaScript: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
}

/**
 * Directory of all projects on this site
 */
const directory: Project[] = [
    new Project('code-ninjas-session-tracker', <CodeNinjasTracker />,
        <ProjectThumbnail projectId='code-ninjas-session-tracker' title='Session Tracker'
            subheading='Tracks Customer Sessions For Code Ninjas Mississauga West'
            content='Built in React with JavaScript, using Firebase for database.'
            image={codeNinjas}></ProjectThumbnail>, ["firebase", "react", "typeScript"])
];

export default directory;