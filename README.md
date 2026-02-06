# Personal Website

This repository lays out a website intended to communicate my personal accomplishments in a professional manner, that is attractive to potential employers. The current application materials I send out while applying to jobs, which I believe best capture my current accomplishments can be found in the `conceptual` folder. This directory contains two main items:

1. [`Resume`](./conceptual/Jacob%20Klimczak%20SWE%20Resume%20-%20Feb%202026.pdf) - An up to date copy of my resume.

2. [`CV`](./conceptual/CMU%20Application%20CV%20-%20Dec%202025.pdf) - An up to date copy of my CV, including publications.

The contents of these documents, should be communicated by this website. Additional personal projects should be presented where appropriate.

## Layouts

This section describes the contents and rough layout of the pages on the side. All layouts should work on both desktop and mobile.

### Career

The career tab should show a timeline of my career. Which jobs I was working at which times (may be multiple), with a neat visual layout and icons for each job. Each job should show a few things:

1. Languages - Any programming languages used in that job.

2. Tools, Frameworks, and Databases - This probably needs a catchier name, but essentially, it should be a list of any tools, frameworks, or databases I used in that job.

3. Field - The type of job (Data Science, Systems, Web).

A sidebar (or perhaps a hamburger menu on mobile) should show users a selection of filters where they can both see the grand sum of the languages, tools, and fields I've worked in, and filter the timeline to see only the roles relevant to different languages, frameworks, and fields. Hovering over a role (or clicking on it in mobile) should show a small popover with some rough information about the role. The popover should have some way of opening a new page with additional information about the role. This should all be done with a sleek, modern UI.

My CV is the best source of information about all the jobs I have worked, and additional information on select jobs can be found in my resume.

#### Role

The popover for a role on the career tab should be able to open a dedicated page for that role. This page should have an expanded description of the work done, should highlight how long I was there, and should list the technologies, languages, and the field the role was in. If there are 'projects' or publications linked to the role, they should be listed here and it should be possible to navigate to their pages.

### Publications

Similar to the career tab, the publications tab should show my publications, as well as conferences I have attended.

This should show a scrolling view of my publications and conference, with publications displayed more prominently and larger than conferences. It should be possible to filter between conferences and publications, as well as to show both at once. This should work well on both desktop and mobile. As in the career page, hovering over a publication or conference (or clicking on mobile) should show a popover with additional information about the publication or conference. The popover should have a way of opening a new page with additional information specific to the publication or conference.

My CV is the best source of information on my publications and conferences.

#### Publication/Conference

Similar to the role tab, a dedicated publication/conference tab should be openable from the publications tab popover. This should have additional information about the publication or conference, including some of the technologies used. If there is a 'project' and/or 'role' linked to the publication, this should be displayed, and it should be possible to navigate to the project/role from this tab.

### Projects

The projects tab should show a table highlighting various projects I've worked on. Projects are either personal, published, or commercial. The table should show the type of project (personal, published, etc...), the name of the project, the time of the project, and some badges relating to the technologies used (doesn't have to be every single technology, that can be saved for the detailed view). Clicking on a project in the table should slide in a nearly full-screen modal with additional information about the project. Whether this modal is open, and which project it is for, should be reflected in the URL params, so that the publication and role pages can link to specific projects. The modal should show extra details about the project, the full list of technologies used, and if the project is associated with a role and/or a publication, should link to both.

My CV is the best source of the projects I have worked on. Most publications correspond to some form of project, and many roles involve projects as well. Things like the Scotiabank or Dexterra competitions also constitute a project.

## Data

The section describes how the data for the application should be provided, transported, and represented.

### In Code

Domain models should be created for all of projects, conferences, publications, and roles, with each being given its own identifier, and any other appropriate attributes. A context object used throughout the site should provide any components that require this data with the full list of all projects, etc... The context object should not be mutable to components, they should receive a populated copy and simply have to reflect its information.

### In Repo

In the repository, descriptions of different roles, conferences, publications, and projects should be primarily driven by YAML. Either at build or at runtime, the YAML files should be converted into domain models, and then reflected by the UI. YAMLs should configure names, associated technologies, and basically any kind of data attributes needed for different domain models, including which custom components should be used to display roles, conferences, publications, etc... using non-default components either on their respective list pages, or in their single-item detailed-view pages.
