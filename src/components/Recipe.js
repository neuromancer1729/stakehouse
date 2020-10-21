import React from 'react';
import { Icon } from '@react95/core';
import styled from '@xstyled/styled-components';
import { useHistory } from 'react-router-dom';

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

const Recipe = ({ key,name, description,icon, onClick, ...rest }) => {
  const history = useHistory();

  return (
    <StyledRecipe
    onClick={() => onClick && onClick(key)}
      {...rest}
    >
      <Icon name={icon} style={{ marginBottom: 4 }} />
      <Name>{`${name}`}</Name>
      {description && <Name>{description}</Name>}
    </StyledRecipe>
  );
};

export default Recipe;
