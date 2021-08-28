import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/proclan.png';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link className="hide-sm" to="/profiles">
          ProClan
        </Link>
      </li>
      <li className="nav-item">
        <Link className="hide-sm" to="/posts">
          Post
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link to="/profiles">Professionals</Link>
      </li>
      <li className="nav-item">
        <Link to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-briefcase" />
          <img className="logo" src={logo} alt="proclan" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
