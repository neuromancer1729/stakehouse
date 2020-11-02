import React, { useEffect, useState } from 'react';

import RecipeContext from './RecipeContext';
import Loading from './Loading';
import firebase from '../../firebase';



const RecipeProvider = ({ children }) => {
  const [loading, toggleLoading] = useState(false);
  const [houses, setHouses] = useState([]);
  const [houseupdated, setHouseUpdated] = useState(0);


  useEffect(() => {
    async function fetchData() {
      debugger;
      toggleLoading(true);
      const houses = await gethouses();
      setHouses(houses);
      setTimeout(() => toggleLoading(false));
    }

    fetchData();
  }, [houseupdated]);

async function gethouses(){
  let houses = [];
  const db = firebase.firestore();
  await db.collection("Houses").get().then((querySnapshot) => {
    querySnapshot.forEach(function(doc) {
      houses.push({name: doc.data().name, description: doc.data().description, key:doc.id,icon: doc.data().icon, roomurl: doc.data().roomurl});
  });
});
  return houses;
}


  return (
    <RecipeContext.Provider
      value={{
        houses,
        houseupdated,
        setHouseUpdated,
      }}
    >
      {children}

      {loading && <Loading />}

    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
