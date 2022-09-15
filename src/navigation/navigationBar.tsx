import './navigationBar.css';
import { Link } from 'react-router-dom';
import pattern from '../../public/images/pattern.png';
import home from '../../public/images/home.svg';

/**
 * Navigation bar component
 * @param props properties for this navigation bar
 */
export default function NavigationBar(props: any) {
    return <div className="nav-bar" style={{
        backgroundImage: `url(${pattern})`,
        backgroundSize: "cover",
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