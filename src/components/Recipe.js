import React, { useState } from 'react';
import { Icon, Alert } from '@react95/core';
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

const Recipe = ({id, name, description,icon,roomurl, onClick, isLoggedin, isMember, setNewHouseJoined, newhousejoined, openLoginModal, ...rest }) => {

  const [showAlert, setAlert] = useState(false)

  return (
     <>
    { showAlert && ( 
        <Alert
        title="Windows Networking"
        type={'question'}
        message="Are you sure to join the room?"
        closeAlert={() => setAlert(false)}
        buttons={[{ value: 'OK', onClick: () => {
          onClick && setAlert(false); 
          onClick(name,id,roomurl)

          isMember && setNewHouseJoined(newhousejoined + 1);
         }
         }, {value: 'Cancel', onClick: () => setAlert(false)}]}
      /> )
    }

   { isLoggedin ?
  (
    <StyledRecipe
    onClick={() =>  isMember ? onClick && onClick(name,id,roomurl) : setAlert(true)}
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
}
  </>
  );
};

export default Recipe;
