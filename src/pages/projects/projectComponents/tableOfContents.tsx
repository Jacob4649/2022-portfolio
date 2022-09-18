import { ReactNode, MutableRefObject } from "react";
import './tableOfContents.css';

/**
 * Props for a table of contents
 */
interface TableOfContentsProps {
    /**
     * Children for this table of contents
     */
    children: ReactNode;

    /**
     * Class name for this table of contents
     */
    className?: string;
}

/**
 * Table of contents
 * @param props properties for this table of contents
 * @returns the table of contents
 */
function TableOfContents(props: TableOfContentsProps) {
    return <div className={'table-of-contents ' + (props.className ?? "")}>
        <span className='contents-title'>Contents</span>
        {props.children}
    </div>;
}

/**
 * Props for a table of contents item
 */
interface TableOfContentsItemProps {

    /**
     * Ref to target
     */
    targetRef: MutableRefObject<HTMLElement | null>;

    /**
     * Children of this item
     */
    children: ReactNode;
}

/**
 * Item in a table of contents
 * @param props properties for this item
 * @returns the created item
 */
function TableOfContentsItem(props: TableOfContentsItemProps) {
    return <span onClick={() => props.targetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
    })}>{props.children}</span>;
}

export { TableOfContents, TableOfContentsItem };
