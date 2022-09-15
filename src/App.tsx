import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './navigation/navigationBar';

/**
 * The root component for this application
 * @returns Root component for this SPA
 */
export default function App() {
  return <>
    <NavigationBar />
    <Outlet />
  </>;
}