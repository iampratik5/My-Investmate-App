import React, { useEffect, useState } from 'react';
import { NavLink as reactNavLink, useNavigate } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { doLogout, getCurrentUserDetails, isLoggedIn } from '../auth';

function CustomNavbar(args) {
  const [isOpen, setIsOpen] = useState(true);

  // const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    setLogin(isLoggedIn())
    // console.log(isLoggedIn());
    setUser(getCurrentUserDetails())
  }, [login]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  }

  return (
    <Navbar color='light' expand="md" fixed=''>
      <NavbarBrand to="/">My InvestMate</NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem >
            <NavLink tag={reactNavLink} to="/user/dashboard">
              {/* <Navigate to='user/dashboard'/> */}
              Dashboard
            </NavLink>
          </NavItem>
        </Nav>
        <Nav>
          {login && (
            <>
              <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret style={{color:"black"}}>
                  {/* /* style={{color:"black"}} */ }
                  {user?.name}
                </DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem header>Profile</DropdownItem> */}
                  {/* <DropdownItem tag={reactNavLink} to="/">
                     Home
                  </DropdownItem> */}
                  <DropdownItem tag={reactNavLink} to={`/user/profile/${user?.id}`}>
                     My Profile
                  </DropdownItem>
                  <DropdownItem tag={reactNavLink} to={`/user/change-password`}>
                     Change Password
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
          {!login && (
            <>
              <NavItem>
                <NavLink tag={reactNavLink} to="/login" style={{color:"black"}}>
                  Login
                </NavLink>
              </NavItem><NavItem>
                <NavLink tag={reactNavLink} to="/signup" style={{color:"black"}}>
                  Signup
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
        {/* <NavbarText>Pratik Mahamuni</NavbarText> */}
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
