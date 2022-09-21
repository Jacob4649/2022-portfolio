import ResponsiveImageWithCaption from "../projects/projectComponents/responsiveImageWithCaption";
import LinkedInBadge from "./linkedInBadge";
import gmailLogo from '../../../public/images/gmail-logo.svg';
import './contact.css';

/**
 * Component with contact information
 * @param props properties for this component
 */
export default function Contact(props: any) {
    return <>
        <div className="shadow-box-container">
            <div className="shadow-box shadow-box-light gmail-box">
                <ResponsiveImageWithCaption src={gmailLogo} alt="gmail" imageStyle={{
                    height: "3rem",
                    width: "auto",
                    padding: "0.5rem",
                    margin: "0"
                }}>
                    jacob.klimczak@gmail.com
                </ResponsiveImageWithCaption>
            </div>

            <LinkedInBadge />
        </div>
    </>;
}