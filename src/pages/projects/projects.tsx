import './projects.css';
import React, { ReactNode, ReactElement, useState, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import directory from './projectPages/projectDirectory';

/**
 * Properties for a project type component
 */
interface ProjectTypeProps {

    /**
     * Type string
     */
    type: string | null;

    /**
     * Currently selected type string
     */
    selectedType: string | null;

    /**
     * Children for this project type
     */
    children?: ReactNode;

    /**
     * Functon optionally called when type is clicked
     */
    onTypeClick?: (type: string | null) => void;
}

/**
 * A single possible project type
 * @param props properties for this component
 */
function ProjectType(props: ProjectTypeProps) {
    return <span className={props.selectedType === props.type ? "selected-type" : undefined} onClick={() => {
        if (props.onTypeClick)
            props.onTypeClick(props.type)
    }}>{props.children ?? (props.type ?? "all").toUpperCase()}</span>;
}

/**
 * Component for showing overview of all the projects on the portfolio
 * @param props properties for this component
 * @returns the projects page component
 */
export function Projects(props: any) {

    const [type, setType] = useState<string | null>(null);

    const [className, setClassName] = useState("projects-container");

    const typeClick = (type: string | null) => {
        setClassName("projects-container projects-switching");
        new Promise(resolve => setTimeout(resolve, 350)).then(() => {
            setType(type);
            setClassName("projects-container");
        });
    };

    return <>
        <div className='project-types'>
            <ProjectType selectedType={type} type={null} onTypeClick={typeClick} />
            <ProjectType selectedType={type} type={"web"} onTypeClick={typeClick} />
            <ProjectType selectedType={type} type={"analytics"} onTypeClick={typeClick} />
            <ProjectType selectedType={type} type={"android"} onTypeClick={typeClick} />
            <ProjectType selectedType={type} type={"windows"} onTypeClick={typeClick} />
        </div>
        <div className={className}>
            {directory.filter(x => x.matchesType(type)).map(x => x.thumbnail)}
        </div>
    </>;
}

/**
 * Properties for a project thumbnail
 */
interface ProjectThumbnailProps {

    /**
     * Thumbnail image to display
     */
    image?: string;

    /**
     * Title to display
     */
    title: string;

    /**
     * Sub heading to display under title
     */
    subheading?: string;

    /**
     * Content to display under title and subheading
     */
    content?: string;

    /**
     * id of the project to open
     */
    projectId: string;

}

/**
 * 
 * @param props 
 */
export function ProjectThumbnail(props: ProjectThumbnailProps) {
    const { image, title, subheading, content, projectId } = props;

    const [rootClass, setRootClass] = useState('project-thumbnail-root');

    const navigate = useNavigate();

    let children: ReactElement[] = [];

    if (image)
        children.push(<img src={image} className='thumbnail-image'>

        </img>)

    children.push(<div className='thumbnail-title'>
        {title}
    </div>);

    if (subheading)
        children.push(<div className='thumbnail-subheading'>
            {subheading}
        </div>);

    if (content)
        children.push(<div className='thumbnail-content'>
            {content}
        </div>);

    let directoryEntry = directory.find(x => x.id == projectId);

    if (directoryEntry && directoryEntry.hasDisplayedTags())
        children.push(<directoryEntry.TagComponent className='thumbnail-tags'></directoryEntry.TagComponent>);

    return <div className={rootClass} onClick={() => {
        setRootClass(prev => `${prev} selected-project`)
        new Promise(resolve => setTimeout(resolve, 250)).then(() => navigate(`/projects/${projectId}`));
    }}>
        {children as ReactNode}
    </div>
}
