import ResponsiveImageWithCaption from "../projects/projectComponents/responsiveImageWithCaption";
import LinkedInBadge from "./linkedInBadge";
import gmailLogo from '../../../public/images/gmail-logo.svg';
import instagramLogo from '../../../public/images/instagram-logo-white.svg';
import phoneLogo from '../../../public/images/phone.svg';
import githubLogo from '../../../public/images/github-logo-white.svg';
import './contact.css';

/**
 * Component with contact information
 * @param props properties for this component
 */
export default function Contact(props: any) {
    return <>
        <div className="shadow-box-container contacts-container">
            <div className="shadow-box shadow-box-light gmail-box">
                <a className='view-gmail' href='mailto:jacob.klimczak@gmail.com' target="_blank" rel="noreferrer">
                    <ResponsiveImageWithCaption src={gmailLogo} alt="gmail" imageStyle={{
                        height: "3rem",
                        width: "auto",
                        padding: "0.5rem",
                        margin: "0"
                    }}>
                        jacob.klimczak@gmail.com
                    </ResponsiveImageWithCaption>
                </a>
            </div>

            <div className="shadow-box shadow-box-dark github-box">
                <a className='view-github' href='https://github.com/Jacob4649' target="_blank" rel="noreferrer">
                    <ResponsiveImageWithCaption src={githubLogo} alt="github" imageStyle={{
                        height: "3rem",
                        width: "auto",
                        padding: "0.5rem",
                        margin: "0"
                    }}>
                        jacob4649
                    </ResponsiveImageWithCaption>
                </a>
            </div>

            <div className="shadow-box shadow-box-dark instagram-box">
                <a className='view-instagram' href='https://www.instagram.com/jacob__klimczak/' target="_blank" rel="noreferrer">
                    <ResponsiveImageWithCaption src={instagramLogo} alt="instagram" imageStyle={{
                        height: "3rem",
                        width: "auto",
                        padding: "0.5rem",
                        margin: "0"
                    }}>
                        @jacob__klimczak
                    </ResponsiveImageWithCaption>
                </a>
            </div>

            <div className="shadow-box shadow-box-light phone-box">
                <ResponsiveImageWithCaption src={phoneLogo} alt="phone" imageStyle={{
                    height: "3rem",
                    width: "auto",
                    padding: "0.5rem",
                    margin: "0"
                }}>
                    +1 (647) 913-8065
                </ResponsiveImageWithCaption>
            </div>

            <LinkedInBadge />
        </div>
    </>;
}