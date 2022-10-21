import './underConstruction.css';

/**
 * Properties for a UnderConstruction component
 */
interface UnderConstructionProps {

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
    </div>
}