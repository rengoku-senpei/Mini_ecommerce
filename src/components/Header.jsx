import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// styled-components
const HeaderContainer = styled.div`
  background-color: #f2bb24;
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 15px;
  margin-bottom: 20px;
`;

const MenuContainer = styled.div`
  display: flex;
`;

const Logo = styled.div`
  display: flex;
  cursor: pointer;
`;

const SignInOrOut = styled.div`
  display: flex;
  cursor: pointer;
`;

const Menu = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

// Header Component
const Header = ({ onSignIn, onSignOut }) => {
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  return (
    <HeaderContainer>
      <Logo
        onClick={() => {
          navigate('/');
        }}
      >
        Logo
      </Logo>
      {isLogged ? (
        <MenuContainer>
          <Menu
            onClick={() => {
              navigate('/admin/category');
            }}
          >
            Category
          </Menu>
          <Menu
            onClick={() => {
              navigate('/admin/subcategory');
            }}
          >
            Sub-Category
          </Menu>
          <Menu
            onClick={() => {
              navigate('/admin/products');
            }}
          >
            Products
          </Menu>
          <Menu
            onClick={() => {
              navigate('/admin/variants');
            }}
          >
            Variants
          </Menu>
          <Menu
            onClick={() => {
              navigate('/admin/subvariants');
            }}
          >
            Sub-Variants
          </Menu>
        </MenuContainer>
      ) : null}
      {user && isLogged ? (
        <SignInOrOut onClick={onSignOut}>Sign Out</SignInOrOut>
      ) : (
        <SignInOrOut onClick={onSignIn}>Sign In</SignInOrOut>
      )}
    </HeaderContainer>
  );
};

export default Header;
