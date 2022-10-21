import React from 'react';
import '../Header/header.css';
import ReactLogo from '../../../src/Logo_2.png';

function Header(props) {
  console.log(props)
  return (
    <nav className="navbar navbar-expand navbar-light bg-dark fixed-top">
      <div className="container">
        <a href="/Dashboard" className="navbar-brand ">
          <img
            src={ReactLogo}
            width={80}
            height={80}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            float="left"
          />{" "}
          <div className="heading">
          <text className="title">द पुना स्कूल ऑफ ब्लाइंड्स</text>
          </div>
        </a>
        <a href="/" className="navbar-brand ">
          {
            
            props.IS_ACTIVE ? <button type="button" class="btn btn-outline-warning" onClick={(e) => {localStorage.removeItem('ActiveSession')}}> बाहेर पडणे </button> : ""
          }
        </a>
      </div>
    </nav>

  );
}

export default Header;

