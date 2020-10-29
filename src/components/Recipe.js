import React from 'react';
import { Icon } from '@react95/core';
import styled from '@xstyled/styled-components';

const StyledRecipe = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;

  width: 25%;
  margin-bottom: 4px;

  text-decoration: none;
  color: inherit;
`;

const Name = styled.span`
  word-break: break-word;
`;

const Recipe = ({id, name, description,icon,roomurl, onClick, isLoggedin, openLoginModal, ...rest }) => {
  return (
    isLoggedin ?
  (
    <StyledRecipe
    onClick={() => onClick && onClick(name,id,roomurl)}
      {...rest}
    >
      <Icon name={icon} style={{ marginBottom: 4 }} />
      <Name>{`${name}`}</Name>
      {description && <Name>{description}</Name>}
    </StyledRecipe>
  ) :
  (
    <StyledRecipe
    onClick={() => openLoginModal && openLoginModal(true)}
      {...rest}
    >
      <Icon name={icon} style={{ marginBottom: 4 }} />
      <Name>{`${name}`}</Name>
      {description && <Name>{description}</Name>}
    </StyledRecipe>
  )
  );
};

export default Recipe;
