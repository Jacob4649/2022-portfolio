import { ReactNode } from "react";
import projectDirectory from "../projectPages/projectDirectory";
import './keyTechnologies.css';

/**
 * Properties for KeyTechnologies
 */
interface KeyTechnologiesProps {
    /**
     * Children of key technologies
     */
    children: ReactNode;

    /**
     * ID of project to get tags for
     */
    projectId: string;

    /**
     * Class name for root div
     */
    className?: string | undefined;
}

/**
 * Component with information about key technologies in a project
 * @param props the properties for this component
 */
export default function KeyTechnologies(props: KeyTechnologiesProps) {

    let directoryEntry = projectDirectory.find(x => x.id === props.projectId);

    let tags: ReactNode = undefined;

    if (directoryEntry)
        tags = <directoryEntry.TagComponent className="thumbnail-tags"></directoryEntry.TagComponent>;

    return <div className={props.className}>
        <span className="key-technologies-title">Key Technologies</span>
        {props.children}
        {tags}
    </div>;
}