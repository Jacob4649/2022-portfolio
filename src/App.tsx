import { Outlet } from 'react-router-dom';
import './App.css';

/**
 * The root component for this application
 * @returns Root component for this SPA
 */
export default function App() {
  return <>
    <Outlet/>
  </>;
}