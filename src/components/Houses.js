import React from 'react';
import styled from '@xstyled/styled-components';
import { Frame, Modal, List } from '@react95/core';

import Recipe from './Recipe';

const Wrapper = styled.div`
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
`;

const FilterResult = styled.span`
  margin-bottom: -10px;
  margin-top: 5px;
`;

const Houses = ({
  houses,
  openProfileModal,
  openSettingModal,
  openLoginModal,
  createRoom,
  joinRoom,
  isLoggedin,
  logout,
  isMobile,
}) => {
  
  const boxProps = {
    defaultPosition: isMobile
      ? { x: 0, y: 50 }
      : { x: window.innerWidth / 2 - 350, y: 75 },
    width: isMobile ? window.innerWidth - 40 : 700,
  };

  return (
    <Modal
      title={``}
      icon="windows_explorer"
      style={{
        marginLeft: 20,
      }}
      {...boxProps}
      menu={[
        {
          name: 'Options',
          list: (
            <List>
              <List.Item onClick={() => openProfileModal()}>
                Profile
              </List.Item>
              <List.Item onClick={() => openSettingModal(true)}>
                Settings
              </List.Item>
              { !isLoggedin && (
              <List.Item onClick={() => openLoginModal(true)}>
                Login
              </List.Item>)
              }
              { isLoggedin && (
                <List.Item onClick={() => logout()}> 
                Logout
                </List.Item>
              )

              }
            </List>
          ),
        },
      ]}
    >
      <Frame
        bg="white"
        boxShadow="in"
        height="100%"
        p={10}
        style={{
          overflowY: 'auto',
          maxHeight: '50vh',
        }}
      >
        <Wrapper >
          <Wrapper style={{width: '100%', 'margin-bottom': '20px', fontSize: 20, fontWeight: 600}}
          >
            <span>Joined Houses</span>
          </Wrapper>
          
          <Recipe key={"createRoom"} name={"Create new house"} icon={"keys"} onClick={createRoom} />
          
        </Wrapper>
        <hr/>
        <Wrapper>
          <Wrapper style={{width: '100%', 'margin-bottom': '20px', fontSize: 20, fontWeight: 600}}>
            <span>Recommended houses</span>
          </Wrapper>
          
          { houses && houses.map((item) => {
            return (
            <Recipe id={item.key} name={item.name} description={item.description} icon={item.icon} roomurl={item.roomurl} onClick={joinRoom} isLoggedin={isLoggedin} openLoginModal={openLoginModal}/>
            )
})}
        </Wrapper>
      </Frame>
    </Modal>
  );
};

export default Houses;
