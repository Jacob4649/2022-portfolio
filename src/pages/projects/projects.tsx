import './projects.css';
import { ReactNode, ReactElement, useState } from 'react';
import logo from '../../../public/images/logo-rounded-rect.svg';
import { useNavigate } from 'react-router-dom';
import directory from './projectPages/projectDirectory';

/**
 * Component for showing overview of all the projects on the portfolio
 * @param props properties for this component
 * @returns the projects page component
 */
export function Projects(props: any) {


    return <>
        <div className='projects-container'>
            {directory.map(x => x.thumbnail)}
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

    return <div className={rootClass} onClick={() => {
        setRootClass(prev => `${prev} selected-project`)
        new Promise(resolve => setTimeout(resolve, 250)).then(() => navigate(`/projects/${projectId}`));
    }}>
        {children as ReactNode}
    </div>
}
