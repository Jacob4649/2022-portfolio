import './navigationBar.css';
import { Link } from 'react-router-dom';
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
    let className: string = "nav-bar";
    let logoClassName: string = "logo";

    if (props.collapsed) {
        className += " collapsed";
        logoClassName += " logo-collapsed";
    }

    return <div className={className} style={{
        height: props.height
    }}>
        <div className="nav-parent">
            <div className="nav-div">
                <Link to="/" className={logoClassName}>
                    <img src={logo} style={{
                        height: props.height
                    }}></img>
                </Link>
                <Link to="/projects">Projects</Link>
            </div>
        </div>
    </div>;;
}