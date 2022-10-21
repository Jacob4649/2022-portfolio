import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Props for a scroll to top
 */
interface ScrollToTopProps {
    /**
     * Children of this ScrollToTop
     */
    children?: ReactNode;
}

/**
 * Scrolls to the top whenever a new route is visited
 * @param props properties
 * @returns a new scroll to top
 */
export default function ScrollToTop(props: ScrollToTopProps) {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
};
