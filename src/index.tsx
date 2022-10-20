import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NoMatch from './navigation/noMatch';
import Home from './pages/home';
import { Projects } from './pages/projects/projects';
import Project from './pages/projects/project';
import Contact from './pages/contacts/contact';
import About from './pages/about/about';
import ScrollToTop from './navigation/scrollToTop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to='home' replace />} />
          <Route path="home" element={<Home />} />
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path=":projectId" element={<Project />} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </ScrollToTop>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
