import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import { getAuth } from "firebase/auth";
import Products from "./products";


function GetData() {
  // const [parties, setParties] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [disabledState, setDisabledState] = useState({});

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      const dataParties = await getDocs(collection(db, "parties"));
      const initParties = dataParties.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const dataUsers = await getDocs(collection(db, "users"));
      const usersData = dataUsers.docs.reduce((users, doc) => {
        const { id, testUpBoolean, testDownBoolean } = doc.data();
        if (id) {
          users[id] = { testUpBoolean, testDownBoolean };
        }
        return users;
      }, {});

      setParties(updatedParties);
      setUsers(dataUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setDisabledState(usersData);

      console.log("UseEffect triggered in partyListContainer")
    };
    fetchData();
  }, []);

  return (
    <div className="partyListContainer">
      <Products />
    </div>
  );
}

export default GetData;