import React from 'react';
import { Modal, Button } from '@react95/core';

const IngredientsModal = ({
  allIngredients,
  toggleFilterModal,
  setAllIngredients,
  isMobile,
}) => {
  const boxProps = {
    width: isMobile ? window.innerWidth : 400,
    height: isMobile ? window.innerHeight - 30 : window.innerHeight - 300,
  };

  return (
    <Modal
      {...boxProps}
      style={{ top: 0 }}
      icon="bat_exec"
      title="Profile"
      closeModal={() => toggleFilterModal(false)}
    >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div className="mainModal">
            <div className="WalletFunds">
                  <span className="wallet-header">Wallet Funds</span>
                  <span className="wallet-amount">2.5ETH</span>
            </div>
            <div className="AddFunds">
              <span className="addFunds-header">Add funds</span>
              <div className="addFunds-buttons">
                <Button className="addFunds-crypto" value="Transfer Crypto">Transfer Crypto</Button>
                <Button className="addFunds-viadebit" value="Add via Debit card">Add via Debit card</Button>
              </div>
            </div>
          </div>
          
          {/* {allIngredients.map(({ name, checked }) => (
            <div
              key={name}
              style={{
                width: '50%',
              }}
            >
              <Checkbox
                checked={checked}
                onClick={() => {
                  const changedIngredients = allIngredients.map((i) =>
                    i.name === name ? { name, checked: !i.checked } : i,
                  );
                  setAllIngredients(changedIngredients);
                }}
              >
                {name}
              </Checkbox>
            </div>
          ))} */}
        </div>
    </Modal>
  );
};

export default IngredientsModal;
