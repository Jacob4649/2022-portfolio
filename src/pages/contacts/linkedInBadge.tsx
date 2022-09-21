import linkedInLogo from '../../../public/images/linkedin-logo.svg';
import '../../App.css';
import './linkedInBadge.css';
import profilePic from '../../../public/images/linkedin-profile.png';

/**
 * A LinkedIn badge component
 * @param props properties for this component
 */
export default function LinkedInBadge(props: any) {

    return <div className="shadow-box shadow-box-linkedin">
        <div className='linkedin-top-div'>
            <img className="linkedin-logo" src={linkedInLogo} alt="linkedin"></img>
        </div>
        <div className='linkedin-bottom-div'>
            <img className='profile-pic' src={profilePic} alt="profile pic"></img>
            <span className='name'>Jacob Klimczak</span>
            <span className='linkedin-title'>Computer Science Specialist at University of Toronto</span>
            <span className='positions'>Code Ninjas Mississauga West | University of Toronto | Phoenix Custom Machines</span>
            <a className='view-profile' href='https://www.linkedin.com/in/jacob-klimczak/' target="_blank" rel="noreferrer">View Profile</a>
        </div>
    </div >;
}