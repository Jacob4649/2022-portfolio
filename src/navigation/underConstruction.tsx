import { ReactNode } from 'react';
import './underConstruction.css';

/**
 * Properties for a UnderConstruction component
 */
interface UnderConstructionProps {
    /**
     * Children of this under construction
     */
    children?: ReactNode;
}

/**
 * Indicates a page is under construction
 * @param props properties for this component
 */
export default function UnderConstruction(props: UnderConstructionProps) {
    return <div className='under-construction-parent'>
        <div className="under-construction">
            PAGE UNDER CONSTRUCTION
        </div>
        Check Back Again Soon!
        {props.children}
    </div>
}