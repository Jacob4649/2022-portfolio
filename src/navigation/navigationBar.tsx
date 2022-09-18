import './navigationBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/images/logo.svg';

interface NavigationBarProps {
    /**
     * Whether this navigation bar is collapsed
     */
    collapsed: boolean;

    /**
     * CSS height string
     */
    height: string;
}

/**
 * Navigation bar component
 * @param props properties for this navigation bar
 */
export default function NavigationBar(props: NavigationBarProps) {
    const location = useLocation();

    let className = "nav-bar";
    let logoClassName = "logo";

    if (props.collapsed) {
        className += " collapsed";
        logoClassName += " logo-collapsed";
    }

    if (location.pathname.endsWith("home")) {
        logoClassName += " current-item";
    }

    let projectsClassName = location.pathname.endsWith("projects") ? "current-item" : "";

    let aboutClassName = location.pathname.endsWith("about") ? "current-item" : "";

    let contactClassName = location.pathname.endsWith("contact") ? "current-item" : "";

    return <div className={className} style={{
        height: props.height
    }}>
        <div className="nav-parent">
            <div className="nav-div">
                <Link to="/" className={logoClassName}>
                    <img alt="Jacob Klimczak" src={logo} />
                </Link>
                <Link className={projectsClassName} to="/projects">PROJECTS</Link>
                <Link className={aboutClassName} to="/about">ABOUT</Link>
                <Link className={contactClassName} to="/contact">CONTACT</Link>
            </div>
        </div>
    </div>;;
}