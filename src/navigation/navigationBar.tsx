import './navigationBar.css';
import { Link } from 'react-router-dom';
import pattern from '../../public/images/pattern.png';
import home from '../../public/images/home.svg';

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

    if (props.collapsed)
        className += " collapsed";

    return <div className={className} style={{
        height: props.height
    }}>
        <div className="nav-parent">
            <div className="nav-div">
                <p>JACOB KLIMCZAK</p>
                <Link to="/">
                    <img src={home}></img>
                </Link>
                <Link to="/projects">Projects</Link>
            </div>
        </div>
    </div>;;
}