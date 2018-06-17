import React from 'react';
import { SearchBox } from 'react-instantsearch/dom';

export default ({handleLeftDrawerToggle, scrollstate}) =>
  <div id="Navbar" className={scrollstate}>
    <div id="Navbar-wrapper">
      <div id="Navbar-inner">
        <div id="logo">
          <span id="LeftDrawer-toggle" onClick={handleLeftDrawerToggle}><i className="fa fa-bars"></i></span>
          <div id="app-title">
            <div className="logo-container"><a href="/"><img className="img-fluid" src="/static/img/lolfreebies-logo.png" /></a></div>
          </div>
        </div>
        <div id="Navbar-content">
          {/* <div className="giveaways-icon">
            <i className="fa fa-gift"></i>
            <span className="badge">1</span>
          </div> */}
          <SearchBox translations={{placeholder: "Search for freebies..."}} autoFocus={true} />
        </div>
      </div>
    </div>
  </div>
