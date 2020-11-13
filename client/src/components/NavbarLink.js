import React from 'react';
import { NavLink } from 'react-router-dom';

function NavbarLink({text}) {
  return (
    <li>
      <NavLink to="/my-collections" className="nav-links">{text}</NavLink>
    </li>
  );
};

export default NavbarLink;