import { ReactNode } from 'react';
import './responsiveImageWithCaption.css';

/**
 * Properties for a ResponsiveImageWithCaption component
 */
interface ResponsiveImageWithCaptionProps {

    /**
     * the src attribute for the image
     */
    src: string;

    /**
     * Alt string for the image
     */
    alt: string;

    /**
     * Caption for this responsive caption with image
     */
    children?: ReactNode;

    /**
     * Inline style for the image
     */
    imageStyle?: any;

    /**
     * Classname for this responsive image
     */
    className?: string;

}

/**
 * Component for an image and text accompanying it that should resize based on the viewport
 * @param props properties 
 * @returns the component
 */
export default function ResponsiveImageWithCaption(props: ResponsiveImageWithCaptionProps) {
    return <div className={'parent-div ' + (props.className ?? "")}>
        <img className='responsive-image' src={props.src} alt={props.alt} style={props.imageStyle}></img>
        <div className='responsiveCaption'>
            {props.children}
        </div>
    </div>;
}