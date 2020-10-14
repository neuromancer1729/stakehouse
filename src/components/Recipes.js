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

const Recipes = ({
  recipes,
  setSelectedRecipe,
  openModal,
  openFilterModal,
  filter,
  isMobile,
}) => {
  const filteredRecipes =
    filter.length > 0
      ? recipes.filter((r) =>
          r.ingredients.some((i) => filter.includes(i.Ingredientes)),
        )
      : recipes;

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
              <List.Item onClick={() => openFilterModal(true)}>
                Profile
              </List.Item>
              <List.Item onClick={() => openFilterModal(true)}>
                Settings
              </List.Item>
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
        <Wrapper>
          {Object.values(filteredRecipes).map(({ name, slug }) => (
            <Recipe key={name} name={name} slug={slug} />
          ))}
        </Wrapper>
      </Frame>
      {filter.length > 0 && (
        <FilterResult>Filter: {filter.join(', ')}</FilterResult>
      )}
    </Modal>
  );
};

export default Recipes;
