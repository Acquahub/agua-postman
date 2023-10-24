import styles from "./nav.module.css";
import React, { useState } from 'react';
import RequestMaker from "../requestMaker";
import Response from "../response";

export default function Nav() {

  return (
    <div>
      <div className="container">

        <div className="bloc-tabs">
          <div className="tabs active-tab">Tab 1</div>
          <div className="tabs">Tab 2</div>
          <div className="tabs">Tab 3</div>
        </div>
      </div>

      <div className="content-tabs">
        <div className="content active-content">
          <RequestMaker></RequestMaker>
          <Response></Response>
        </div>
      </div>
    </div>
    
  );
}