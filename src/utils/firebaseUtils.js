import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseconfig';

// Function to fetch data from Firebase
export const fetchDataFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Products'));
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};