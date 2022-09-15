import logo from '../../public/images/logo.svg';
import './home.css'

/**
 * Component for the home page
 * @param props properties for this component
 */
export default function Home(props: any) {
    return <>
        <div className="landing-screen">
            <div className="landing-logo" style={{
                backgroundImage: `url(${logo})`
            }}>
            </div>
        </div>
        <div>
            Projects
            <p>
                This is some text
            </p>
        </div>
    </>;
}