import './noMatch.css';

/**
 * Component for when no match can be found for a url
 * @param props properties for this component
 */
export default function NoMatch(props: any) {
    return <>
        <div className='no-match-div'>
            Page Not Found
        </div>
    </>;
}