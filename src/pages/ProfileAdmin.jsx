import React, { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function ProfileAdmin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    classification: "",
    codigo: "",
    name: "",
    price: 0,
  });

  const productsCollectionRef = collection(db, "Products");

  const createProduct = async () => {
    await addDoc(productsCollectionRef, newProduct);
    setNewProduct({
      classification: "",
      codigo: "",
      name: "",
      price: 0,
    });
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Products", id);
    await deleteDoc(productDoc);
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Classification..."
        value={newProduct.classification}
        onChange={(event) =>
          setNewProduct({ ...newProduct, classification: event.target.value })
        }
      />
      <input
        placeholder="Codigo..."
        value={newProduct.codigo}
        onChange={(event) =>
          setNewProduct({ ...newProduct, codigo: event.target.value })
        }
      />
      <input
        placeholder="Name..."
        value={newProduct.name}
        onChange={(event) =>
          setNewProduct({ ...newProduct, name: event.target.value })
        }
      />
      <input
        placeholder="Price..."
        value={newProduct.price}
        onChange={(event) =>
          setNewProduct({ ...newProduct, price: event.target.value })
        }
      />
      <button onClick={createProduct}>Create Product</button>

        <div className="deleteProducts">
        {products.map((product) => {
          products.sort((a, b) => b.votes - a.votes);
          return (
              <div className="productCardAdmin" key={product.id}>
                <p>Produto: {product.name}</p>
                <button onClick={() => deleteProduct(product.id)}>Deletar Product</button>
              </div>
          );
        })}
        </div>
    </div>
  );
}

export default ProfileAdmin;