import '../../App.css';
import './about.css';
import profilePic from '../../../public/images/linkedin-profile.png';

/**
 * Component for the about page
 * @param props properties for this component
 */
export default function About(props: any) {
    return <div className='shadow-box-container about-container'>
        <div className='shadow-box shadow-box-dark'>
            <img className="profile-pic-about" src={profilePic} alt="profile pic"></img>
        </div>
        <div className='shadow-box shadow-box-light'>
            <span className='section-title'>A Bit About Me</span>
            Hi, I'm Jacob Klimczak—an aspiring full stack developer with interests
            in machine learning and computer vision. As a developer at Rotogran, I've
            gotten a feel for software, and have become familiar with a variety of languages,
            design patterns, and technologies. My experiences as a developer have reaffirmed my interest
            in software, and have pushed me to learn more about it as a field. To that end,
            I am currently a student at the University of Toronto in the Computer
            Science Specialist program.
            <br></br><br></br>
            Make sure to check out the <span style={{ fontStyle: "italic" }}>Projects</span> page.
            There's a lot of interesting stuff there, and it gives a pretty comprehensive overview of what I consider
            to be my best software undertakings.
            <br></br><br></br>
            Feel free to reach out and shoot me a message if you have any questions!
        </div>
    </div>;
}