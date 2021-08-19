import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Link from 'next/link';
import {
  FiHome,
  FiUserPlus,
  FiLogIn,
  FiUpload,
  FiShoppingBag,
  FiLogOut,
  FiBarChart2
} from 'react-icons/fi';
import PropTypes from 'prop-types';
import './header.scss';

const Header = ({ isAuthenticated, userType, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Navbar className="navbar" color="" expand="md">
        <Link href="/">
          <NavLink>Harvest</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/some">
                <NavLink>
                  <FiHome />
                  Some
                </NavLink>
              </Link>
            </NavItem>
            {/* <NavItem>
              <Link href="/upload">
                <NavLink>
                  <FiUpload />
                  Add[TEST]
                </NavLink>
              </Link>
            </NavItem>
            */}
            <NavItem>
              <Link href="/cart">
                <NavLink>
                  <FiShoppingBag />
                </NavLink>
              </Link>
            </NavItem>
            {isAuthenticated ? (
              <>
                {userType === 'SELLER' && (
                  <>
                    <NavItem>
                      <Link href="/upload">
                        <NavLink>
                          <FiUpload />
                          Add Product
                        </NavLink>
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link href="/products/uploads">
                        <NavLink>
                          <FiBarChart2 />
                          Uploads
                        </NavLink>
                      </Link>
                    </NavItem>
                  </>
                )}
                <NavItem>
                  <NavLink onClick={onLogout}>
                    <FiLogOut />
                    Log Out
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link href="/signup">
                    <NavLink>
                      <FiUserPlus />
                      Sign up
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/login">
                    <NavLink>
                      <FiLogIn />
                      Log in
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Header;
