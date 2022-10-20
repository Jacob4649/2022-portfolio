import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import NavigationBar from './navigation/navigationBar';
import Footer from './navigation/footer';

/**
 * Height of nav bar in rem
 */
const defaultNavHeight: number = 4;

/**
 * Collapsed height of nav bar in rem
 */
const collapsedNavHeight: number = 2.5;

/**
 * The root component for this application
 * @returns Root component for this SPA
 */
export default function App() {

  const ref = useRef(null);

  const inView = useIsInViewport(ref);

  const path = useLocation();

  let isHome = path.pathname.toLowerCase().endsWith("home");

  let collapsed = inView && isHome;

  let activeHeight = collapsed ? `${collapsedNavHeight}rem` : `${defaultNavHeight}rem`;

  return <>
    <NavigationBar collapsed={collapsed} height={activeHeight} />
    <div ref={ref} className={isHome ? "padding padding-landing-screen" : "padding"} />
    <Outlet />
    <Footer />
  </>;
}

function useIsInViewport(ref: MutableRefObject<any>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}