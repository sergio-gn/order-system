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
    promo: false,
    promoprice: "",
    indisponivel: false
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [selectedProductIndisponivel, setSelectedProductIndisponivel] = useState(false);
  const productsCollectionRef = collection(db, "Products");

  const createProduct = async () => {
    await addDoc(productsCollectionRef, newProduct);
    setNewProduct({
      classification: "",
      codigo: "",
      name: "",
      price: 0,
      promo: false,
      promoprice: "",
      indisponivel: false
    });
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Products", id);
    await deleteDoc(productDoc);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSelectedProductIndisponivel(product.indisponivel);
  };
  

  const handleUpdateProduct = async () => {
    const updatedProduct = {
      ...selectedProduct,
      indisponivel: selectedProductIndisponivel,
    };
  
    const productDocRef = doc(db, "Products", selectedProduct.id);
    await updateDoc(productDocRef, updatedProduct);
    setSelectedProduct(null);
  };  

  const handleCancelEdit = () => {
    setSelectedProduct(null);
  };

  const handleIndisponivelChange = (event) => {
    setNewProduct({ ...newProduct, indisponivel: event.target.checked });
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const filteredProducts = products.filter((product) => {
        const nameMatch = product.name && product.name.toLowerCase().includes(searchTermLower);
        const codigoMatch = product.codigo && product.codigo.toLowerCase().includes(searchTermLower);

        return nameMatch || codigoMatch;
      });

      setSearchedProducts(filteredProducts);
    } else {
      setSearchedProducts([]); // Empty array when no search term
    }
  };

  return (
    <div className="App">
      <div className="createProduct-dad profile-card">
        <div className="createProduct">
          <input
            placeholder="Categoria..."
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
            placeholder="Nome..."
            value={newProduct.name}
            onChange={(event) =>
              setNewProduct({ ...newProduct, name: event.target.value })
            }
          />
          <input
            placeholder="Preco..."
            value={newProduct.price}
            onChange={(event) =>
              setNewProduct({ ...newProduct, price: event.target.value })
            }
          />
          <div className="d-flex">
            Indisponivel:
            <input
              type="checkbox"
              checked={newProduct.indisponivel}
              onChange={handleIndisponivelChange}
            />
          </div>
        </div>
        <button className="profileButton" onClick={createProduct}>Criar Produto</button>
      </div>

      <div className="profile-edit-product">
        <input
          className="searchBar-full"
          placeholder="Buscar pelo nome ou codigo..."
          value={searchTerm}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <div className="productCards">
          {searchedProducts.map((product) => {
            return (
              <div className="productCardAdmin" key={product.id}>
                <p>Produto: {product.name}</p>
                <p>Codigo: {product.codigo}</p>
                <button onClick={() => deleteProduct(product.id)}>Deletar Produto</button>
                <button onClick={() => handleSelectProduct(product)}>Editar Produto</button>
              </div>
            );
          })}
        </div>
        {selectedProduct && (
          <div>
            <p>Editar Produto:</p>
              <div className="createProduct-dad profile-card">
                <input
                  placeholder="Classification..."
                  value={selectedProduct.classification}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      classification: event.target.value,
                    })
                  }
                />
                <input
                  placeholder="Codigo..."
                  value={selectedProduct.codigo}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      codigo: event.target.value,
                    })
                  }
                />
                <input
                  placeholder="Name..."
                  value={selectedProduct.name}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: event.target.value,
                    })
                  }
                />
                <input
                  placeholder="Price..."
                  value={selectedProduct.price}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: event.target.value,
                    })
                  }
                />
                <div className="d-flex">
                  <input
                  placeholder="Novo preco promocional"
                  value={selectedProduct.promoprice}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      promoprice: event.target.value,
                    })
                  }
                />
                <div className="d-flex">
                  Indisponivel:
                  <input
                    type="checkbox"
                    checked={selectedProductIndisponivel}
                    onChange={(event) => setSelectedProductIndisponivel(event.target.checked)}
                  />
                </div>
              </div>
              <button onClick={handleUpdateProduct}>Atualizar Produto</button>
              <button onClick={handleCancelEdit}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileAdmin;