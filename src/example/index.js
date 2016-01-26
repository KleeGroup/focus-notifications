import React from 'react';
import ReactDOM from 'react-dom';
import SmartNotificationCenter from '../';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'material-design-lite/material.css';
import 'material-design-lite/material.min';

// Initial store population
const mockNotifs = [
    {title: 'TITRE', content: 'CONTENT ...', date: new Date().toISOString(), type: 'info', author: 'joe.lopez@gmail.com'},
    {title: 'TITRE 2', content: 'CONTENT 2 ...', date: new Date().toISOString(), type: 'info', author: 'david.lopez@gmail.com'},
    {title: 'TITRE 3', content: 'CONTENT 3 ...', date: new Date().toISOString(), type: 'info', author: 'joe.lopez@gmail.com'}
];
//store.dispatch(addNotifications(mockNotifs));

// Create the react component when the DOM is loaded.
document.addEventListener('DOMContentLoaded', (event) => {

    const rootElement = document.querySelector(`.${__ANCHOR_CLASS__}`);
    // The child must be wrapped in a function
    // to work around an issue in React 0.13.
    ReactDOM.render(
            <div className='mdl-layout  mdl-layout--fixed-header'>
            <header className='mdl-layout__header'>
            <div className='mdl-layout__header-row'>
              <span className='mdl-layout-title'>Title</span>
              <div className='mdl-layout-spacer'></div>
              <nav className='mdl-navigation mdl-layout--large-screen-only'>
                <a className='mdl-navigation__link' href=''>Link</a>
                <a className='mdl-navigation__link' href=''>Link</a>
                <a className='mdl-navigation__link' href=''>Link</a>
                <SmartNotificationCenter config={{rootURL:'http://localhost:9999/x/notification'}} />
              </nav>

            </div>
            </header>
            <div className='mdl-layout__drawer'>
            <span className='mdl-layout-title'>Notification Center</span>
            <nav className='mdl-navigation'>
              <a className='mdl-navigation__link' href=''>Link</a>
              <a className='mdl-navigation__link' href=''>Link</a>
              <a className='mdl-navigation__link' href=''>Link</a>
              <a className='mdl-navigation__link' href=''>Link</a>
            </nav>
            </div>
            <main className='mdl-layout__content'>
            <div className='page-content'>APPLICATION CONTENT</div>
            </main>
            </div>,
    rootElement);
});
