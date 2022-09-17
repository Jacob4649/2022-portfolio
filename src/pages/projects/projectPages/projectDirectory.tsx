import { ReactNode } from "react";
import androidLogo from '../../../../public/images/android.svg';
import covidLogo from '../../../../public/images/covid-19.svg';
import siteLogo from '../../../../public/images/logo-rounded-rect.svg';
import rLogo from '../../../../public/images/r-logo.svg';
import rotogranlogo from '../../../../public/images/rotogran-logo.png';
import codeNinjas from '../../../../public/images/white-belt-512.png';
import { ProjectThumbnail } from "../projects";
import CodeNinjasTracker from "./codeNinjasTracker";
import ExpediaAnalytics from "./expediaAnalytics";
import Portfolio from "./portfolio";
import RotogranERP from "./rotogranERP";
import RotogranERPAndroid from "./rotogranERPAndroid";
import VaccineAnalysis from "./vaccineAnalysis";

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
     * How impressive this project is from 1-5 (1 = low, 5 = high)
     */
    wowFactor: number;

    /**
     * Creates a new Project
     * @param id id for the project
     * @param component page component for the project
     * @param thumbnail thumbnail for the project
     * @param tags all the tags this project should have
     * @param wowFactor how impressive this project is from 1-5 (1 = low, 5 = high)
     */
    constructor(id: string, component: ReactNode, thumbnail: ReactNode, tags: string[] = [], wowFactor: number = 1) {
        this.id = id;
        this.component = component;
        this.thumbnail = thumbnail;
        this.tags = tags;
        this.displayedTags = this.tags.filter(x => tagsBundle[x]);
        this.wowFactor = wowFactor;
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
        {this.displayedTags.sort().map(x => <img src={tagsBundle[x]}></img>)}
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
    mssql: "https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white",
    python: "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54",
    kaggle: "https://img.shields.io/badge/Kaggle-035a7d?style=for-the-badge&logo=kaggle&logoColor=white",
    twitter: "https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white",
    "c#": "https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white",
    lua: "https://img.shields.io/badge/lua-%232C2D72.svg?style=for-the-badge&logo=lua&logoColor=white",
    java: "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white",
    windows: "https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white",
    kotlin: "https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white",
    reactRouter: "https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
}

/**
 * Maps different types to the tags projects under those types should have
 * 
 * Each project listed under each type, will have at least one of the tags listed under that type.
 * Can have tags not listed in the tags bundle. Null values match all tags.
 */
const typesBundle: { [key: string]: string[] | null } = {
    all: null,
    web: ["javaScript", "typeScript", "react", "web", "reactRouter"],
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
            image={codeNinjas}></ProjectThumbnail>, ["firebase", "react", "javaScript", "reactRouter"], 3),

    new Project('portfolio', <Portfolio />,
        <ProjectThumbnail projectId='portfolio' title='Portfolio'
            subheading='The Portfolio Website You Are On Right Now'
            content='Built in React with TypeScript. Hosted with Firebase.'
            image={siteLogo}></ProjectThumbnail>, ["firebase", "react", "typeScript", "reactRouter"], 2),

    new Project('expedia-analytics', <ExpediaAnalytics />,
        <ProjectThumbnail projectId='expedia-analytics' title='Expedia Search Analytics'
            subheading='Analysis Of Expedia Recommended Bookings'
            content='Analysis in R using publicly available Expedia dataset.'
            image={rLogo}></ProjectThumbnail>, ["r"], 1),

    new Project('vaccine-analysis', <VaccineAnalysis />,
        <ProjectThumbnail projectId='vaccine-analysis' title='COVID-19 Vaccine Tweet Analysis'
            subheading='Sentiment Analysis Of COVID-19 Tweets'
            content='Used VADER to breakdown sentiment towards vaccination during the COVID-19 pandemic by state.'
            image={covidLogo}></ProjectThumbnail>, ["python", "kaggle", "twitter", "analytics"], 2),

    new Project('rotogran-erp', <RotogranERP />,
        <ProjectThumbnail projectId='rotogran-erp' title='Rotogran ERP System'
            subheading='ERP System For Rotogran International Inc'
            content='ERP System with backend mostly in C#, and client applications for a variety of platforms.'
            image={rotogranlogo}></ProjectThumbnail>, ["c#", "net", "lua", "java", "mssql", "windows"], 5),

    new Project('rotogran-erp-android', <RotogranERPAndroid />,
        <ProjectThumbnail projectId='rotogran-erp-android' title='Rotogran ERP Android App'
            subheading='Android Client For Rotogran ERP System'
            content='Android ERP app for Android used by Rotogran International Inc.'
            image={androidLogo}></ProjectThumbnail>, ["android", "java", "kotlin"], 5)
];

export default directory.sort((a, b) => b.wowFactor - a.wowFactor);