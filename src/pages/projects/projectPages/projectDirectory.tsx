import { ReactNode } from "react";
import { ProjectThumbnail } from "../projects";
import CodeNinjasTracker from "./codeNinjasTracker";
import codeNinjas from '../../../../public/images/white-belt-512.png';
import siteLogo from '../../../../public/images/logo-rounded-rect.svg';
import Portfolio from "./portfolio";

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
     * All the tags to display for this project
     * 
     * Should be the subset of tags that has corresponding entries
     * in tagsBundle
     */
    displayedTags: string[];

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
        this.displayedTags = this.tags.filter(x => tagsBundle[x]);
    }

    /**
     * 
     * @returns whether this project has tags
     */
    hasDisplayedTags = () => this.displayedTags.length > 0;

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
        {this.displayedTags.map(x => <img src={tagsBundle[x]}></img>)}
    </div>;

    /**
     * 
     * @param type the type to check for
     * @returns whether this project matches the specified type
     */
    matchesType = (type: string | null) => type === null || this.tags.some(x => typesBundle[type.toLowerCase()]?.includes(x));

}

/**
 * Bundle of all the different tags projects can have
 */
const tagsBundle: { [key: string]: string } = {
    firebase: "https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white",
    react: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    typeScript: "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
    javaScript: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
    android: "https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white",
    r: "https://img.shields.io/badge/r-%23276DC3.svg?style=for-the-badge&logo=r&logoColor=white",
    net: "https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white",
    mssql: "https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white"

}

/**
 * Maps different types to the tags projects under those types should have
 * 
 * Each project listed under each type, will have at least one of the tags listed under that type.
 * Can have tags not listed in the tags bundle. Null values match all tags.
 */
const typesBundle: { [key: string]: string[] | null } = {
    all: null,
    web: ["javaScript", "typeScript", "react", "web"],
    analytics: ["r", "analytics"],
    android: ["android"],
    windows: ["windows"]
}

/**
 * Directory of all projects on this site
 */
const directory: Project[] = [
    new Project('code-ninjas-session-tracker', <CodeNinjasTracker />,
        <ProjectThumbnail projectId='code-ninjas-session-tracker' title='Session Tracker'
            subheading='Tracks Customer Sessions For Code Ninjas Mississauga West'
            content='Built in React with JavaScript, using Firebase for database.'
            image={codeNinjas}></ProjectThumbnail>, ["firebase", "react", "javaScript"]),
    new Project('portfolio', <Portfolio />,
        <ProjectThumbnail projectId='portfolio' title='Portfolio'
            subheading='The Portfolio Website You Are On Right Now'
            content='Built in React with TypeScript. Hosted with Firebase.'
            image={siteLogo}></ProjectThumbnail>, ["firebase", "react", "typeScript"])
];

export default directory;