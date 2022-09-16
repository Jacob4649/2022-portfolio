import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import directory from "./projectPages/projectDirectory";

/**
 * Component that wraps a single project with the specified id
 * @param props properties for this component
 * @returns the component for a single project
 */
export default function Project(props: any) {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params["projectId"];
    const project = directory.find(x => x.id == projectId)?.component;

    if (!project)
        navigate('/project-not-found');

    return <>
        {project}
    </>;
}