import React, { useEffect, useState } from 'react';
import Tabletop from 'tabletop';
import { useSelector } from 'react-redux';
import { Alert } from '@react95/core';
import localforage from 'localforage';

import RecipeContext from './RecipeContext';
import Loading from './Loading';
import slugify from '../../utils/slugify';
import firebase from '../../firebase';

const SPREADSHEET_ID = '1Uou8R5Bgrdl9M8ykKZeSj5MAl_huugiG3rRIQyMtxvI';

const recipesDB = localforage.createInstance({
  name: ' recipes',
});

const ingredientsDB = localforage.createInstance({
  name: 'ingredients',
});

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [loading, toggleLoading] = useState(false);
  const [alertData, setAlertData] = useState(undefined);
  const [houses, setHouses] = useState([]);

  function getDataFromSpreadsheet() {
    toggleLoading(true);
    Tabletop.init({
      key: SPREADSHEET_ID,
      callback: (_, data) => {
        const allRecipes = Object.values(data.models).map((m) => {
          const pIndex = m.elements.findIndex((e) =>
            e.Ingredientes.toLowerCase().includes('preparo'),
          );
          const imgIndex = m.elements.findIndex((e) =>
            e.Ingredientes.toLowerCase().includes('imagens'),
          );

          const hasImgs = imgIndex !== -1;

          const ingredients = m.elements.slice(0, pIndex);
          const preparation = m.elements
            .slice(pIndex + 1, hasImgs ? imgIndex : m.elements.length)
            .map((i) => i.Ingredientes);

          const images = hasImgs
            ? m.elements
                .slice(imgIndex + 1, m.elements.length)
                .map((i) => i.Ingredientes)
            : [];

          const slug = slugify(m.name);

          return { name: m.name, ingredients, preparation, images, slug };
        });

        const allIngredients = Array.from(
          new Set(
            allRecipes
              .map((r) => r.ingredients.map((i) => i.Ingredientes))
              .flat()
              .sort(),
          ),
        ).map((i) => ({
          name: i,
          checked: false,
        }));

        recipesDB.setItem('recipes', allRecipes);
        ingredientsDB.setItem('ingredients', allIngredients);

        setRecipes(allRecipes);
        setAllIngredients(allIngredients);

        setTimeout(() => toggleLoading(false));
      },
      simpleSheet: true,
    });
  }

  useEffect(() => {
    async function fetchData() {
      const recipes = await recipesDB.getItem('recipes');
      const ingredients = await ingredientsDB.getItem('ingredients');
      const houses = await gethouses();
      setHouses(houses);
      if (!recipes) {
        getDataFromSpreadsheet();
      } else {
        setRecipes(recipes);
        setAllIngredients(ingredients);
      }
    }

    fetchData();
  }, []);

async function gethouses(){
  let houses = [];
  const db = firebase.firestore();
  await db.collection("Houses").get().then((querySnapshot) => {
    querySnapshot.forEach(function(doc) {
      houses.push({name: doc.data().name, description: doc.data().description, key:doc.id,icon: doc.data().icon, roomurl: doc.data().roomurl});
  });
});
console.log(houses);
  return houses;
}



  function getRecipeFromSlug(slug) {
    return recipes.find((r) => r.slug === slug) || {};
  }

  return (
    <RecipeContext.Provider
      value={{
        allIngredients,
        getRecipeFromSlug,
        recipes,
        houses,
        selectedRecipe,
        setSelectedRecipe,
        sheetId: SPREADSHEET_ID,
        updateRecipes: getDataFromSpreadsheet,
      }}
    >
      {children}

      {loading && <Loading />}

      {alertData && <Alert style={{ zIndex: 2 }} {...alertData} />}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
