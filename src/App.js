import React, { useState } from 'react';
import  { createGlobalStyle } from '@xstyled/styled-components';
import { TaskBar } from '@react95/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'react-medium-image-zoom/dist/styles.css';
import '../src/style.scss'
import Portis from '@portis/web3';
import Web3 from 'web3';

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

  const portis = new Portis('72f8e659-ecc9-4a33-8357-c66bd3f71685', 'mainnet');
  const web3 = new Web3(portis.provider);
  const [isLoggedin, setLogin] = useState(false);

  const [showModal, toggleModal] = useState(false);
  const [showProfileModal, toggleProfileModal] = useState(false);
  const [showLoginModal, toggleLoginModal] = useState(false);
  const [showSettingModal, toggleSettingModal] = useState(false);
  const [balance, setBalance] = useState(0);


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

  portis.onLogin((walletAddress) => {
    toggleLoginModal(false);
    setLogin(true);
    getAccounts();
    
  })

  function getAccounts(){
    web3.eth.getAccounts((error, accounts) => {
      checkBalance(accounts[0]);  
    });
  }

  async function checkBalance(account) {
    const balance = await web3.eth.getBalance(account);
    setBalance(balance);
  }

  portis.onLogout((walletAddress) => {
    setLogin(false);
  })



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
