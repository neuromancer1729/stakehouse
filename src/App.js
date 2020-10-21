import React, { useState } from 'react';
import  { createGlobalStyle } from '@xstyled/styled-components';
import { TaskBar } from '@react95/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'react-medium-image-zoom/dist/styles.css';
import '../src/style.scss'
import Portis from '@portis/web3';
import Web3 from 'web3';
import firebase from './firebase';

import { Houses, RecipeModal, TaskList, LoginModal, ProfileModal } from './components';
import { useRecipes } from './components/RecipeContext';
import SettingsModal from './components/SettingsModal';

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  ) || window.innerWidth < 500;

  

const Style = createGlobalStyle`
  body {
    font-size: 12px;
  }
`;

function App() {
  const {
    recipes,
    allIngredients,
    selectedRecipe,
    setSelectedRecipe,
    houses,
  } = useRecipes();

  const portis = new Portis('72f8e659-ecc9-4a33-8357-c66bd3f71685', 'mainnet', {scope: ["email", "reputation"]});
  const web3 = new Web3(portis.provider);
  const [isLoggedin, setLogin] = useState(false);

  const [showModal, toggleModal] = useState(false);
  const [showProfileModal, toggleProfileModal] = useState(false);
  const [showLoginModal, toggleLoginModal] = useState(false);
  const [showSettingModal, toggleSettingModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState();
  const [walletAddress, setWalletAddress] = useState();


  function openProfileModal(){
    if(isLoggedin) {
       toggleProfileModal(true); }
       else {
         toggleLoginModal(true);
       }

  }

function isUserLoggedIn() {
  portis.isLoggedIn().then(({ error, result }) => {
    setLogin(result);
    getAccounts();
  });
 return isLoggedin; 
}

  function loginToPortis(){
    portis.provider.enable();
  }

  function logout(){
    portis.logout();
    setLogin(false);
  }

  portis.onLogin((walletAddress, email, reputation) => {
    toggleLoginModal(false);
    setEmail(email);
    setWalletAddress(walletAddress);
    setLogin(true);
    createUser(walletAddress.toLowerCase(), email, reputation);
    getAccounts();
    
  })

  function createUser(walletAddress, email, reputation){
    const db = firebase.firestore();
    db.collection("Users").doc(walletAddress).get().then(function(doc){
          if(!doc.exists){
              db.collection("Users").doc(walletAddress).set({
                email: email,
                reputation: reputation,
              }).then(function(doc) {
                  //set success message here if required.
              }).catch(function(doc) {
                  //set error message here if required.
              })
          }
    })
  }


  function getUser(walletAddress) {
    const db = firebase.firestore();
    db.collection("Users").doc(walletAddress).get().then(function(doc) {
        setEmail(doc.data().email);
        setWalletAddress(walletAddress);
    });

    getUserHouses(walletAddress);
  }

  function getUserHouses(walletAddress){

  }

  function getAccounts(){
    web3.eth.getAccounts((error, accounts) => {
      getUser(accounts[0].toLowerCase());
      checkBalance(accounts[0]);  
    });
  }

  async function checkBalance(account) {
    const balance = await web3.eth.getBalance(account);
    setBalance(balance);
  }

  portis.onLogout((walletAddress) => {
    setLogin(false);
    setEmail(undefined); setWalletAddress(undefined);
  })

  function joinRoom(key){

  }



  function openModal() {
    toggleModal(true);
  }

  function closeModal() {
    toggleModal(false);
  }

  const filter = allIngredients.filter((t) => t.checked).map((i) => i.name);

  return (
    <>
      <Style />
      
      <Router>
        
          <Houses
            houses={houses}
            openModal={openModal}
            setSelectedRecipe={setSelectedRecipe}
            openProfileModal={openProfileModal}
            openSettingModal={toggleSettingModal}
            openLoginModal={toggleLoginModal}
            joinRoom={joinRoom}
            createRoom={null}
            isLoggedin={isLoggedin}
            logout={logout}
            filter={filter}
            isMobile={isMobile}
          />
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/:recipeSlug`}>
            <RecipeModal
              selectedRecipe={selectedRecipe}
              closeModal={closeModal}
              isMobile={isMobile}
            />
          </Route>
        </Switch>
      </Router>

      {showModal && (
        <RecipeModal
          selectedRecipe={selectedRecipe}
          closeModal={closeModal}
          isMobile={isMobile}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          toggleProfileModal={toggleProfileModal}
          walletBalance={balance}
          isMobile={isMobile}
        />
      )}

      {showLoginModal && (
        <LoginModal
        toggleLoginModal={toggleLoginModal}
        logintoPortis={loginToPortis}
        isMobile={isMobile}
        />
      )}

      {showSettingModal && (
        <SettingsModal
          toggleSettingModal={toggleSettingModal}
          email={email}
          isMobile={isMobile}
          />
      )}

      <TaskBar
        list={
          <TaskList
          openLoginModal={toggleLoginModal}
          isLoggedin={isLoggedin}
          logout={logout}
          />
        }
      />
    </>
  );
}

export default App;
