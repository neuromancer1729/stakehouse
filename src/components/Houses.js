import React, { useEffect, useState } from 'react';
import styled from '@xstyled/styled-components';
import { Frame, Modal, List } from '@react95/core';
import firebase from '../firebase';

import Recipe from './Recipe';

const Wrapper = styled.div`
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
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
  walletAddress,
}) => {
  
  const boxProps = {
    defaultPosition: isMobile
      ? { x: 0, y: 50 }
      : { x: window.innerWidth / 2 - 350, y: 75 },
    width: isMobile ? window.innerWidth - 40 : 700,
  };
  const [userHouses, setuserHouses] = useState([])
  const [filteredHouse, setFilteredHouses] = useState([])
  const [newhousejoined, setNewHouseJoined] = useState(0)

  useEffect(() => {
    function getUserHouses(walletAddress){
      const db = firebase.firestore();
      let userHouses = [];
      db.collection("UserHouses").where("userId", '==', walletAddress).get().then(function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          userHouses.push(houses.filter((t) => t.key === doc.data().houseId)[0]);
      });
      setuserHouses(userHouses);
      setFilteredHouses(houses.filter(f => !userHouses.includes(f)))
      });
    }

    isLoggedin ? getUserHouses(walletAddress) : setFilteredHouses(houses);
  },[isLoggedin, walletAddress, houses, newhousejoined])
 


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
          { 
          (isLoggedin && userHouses) && userHouses.map((item) => {
            return (
              <Recipe id={item.key} name={item.name} isMember={true} icon={item.icon} roomurl={item.roomurl} onClick={joinRoom} isLoggedin={isLoggedin} openLoginModal={openLoginModal}/>
              )
          })}
          
        </Wrapper>
        <hr/>
        <Wrapper>
          <Wrapper style={{width: '100%', 'margin-bottom': '20px', fontSize: 20, fontWeight: 600}}>
            <span>Recommended houses</span>
          </Wrapper>
          
          { filteredHouse && filteredHouse.map((item) => {
            return (
            <Recipe id={item.key} name={item.name} isMember={false} newhousejoined={newhousejoined} setNewHouseJoined={setNewHouseJoined} description={item.description} icon={item.icon} roomurl={item.roomurl} onClick={joinRoom} isLoggedin={isLoggedin} openLoginModal={openLoginModal}/>
            )
})}
        </Wrapper>
      </Frame>
    </Modal>
  );
};

export default Houses;
