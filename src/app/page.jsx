"use client";
import React from "react";

function MainComponent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [products, setProducts] = React.useState([
    { id: 1, name: "React 1", category: "Libraries", stock: 15 },
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSaveProduct = (event) => {
    event.preventDefault();
    if (editProductData.id) {
      setProducts(
        products.map((product) =>
          product.id === editProductData.id ? editProductData : product
        )
      );
    } else {
      const newId = products.length
        ? Math.max(...products.map((p) => p.id)) + 1
        : 1;
      setProducts([...products, { ...editProductData, id: newId }]);
    }
    setEditProductData(null);
  };

  const handleEditProduct = (product) => {
    setEditProductData({ ...product });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setEditProductData(null);
  };

  const [editProductData, setEditProductData] = React.useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inventoryActions = editProductData ? (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleSaveProduct}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleCancelEdit}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Cancel
      </button>
    </div>
  ) : null;

  return (
    <div className="font-roboto min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <span className="font-semibold text-xl">
            React Inventory Management App
          </span>
          <button
            onClick={() =>
              setEditProductData({ name: "", category: "", stock: "" })
            }
            className={
              !editProductData
                ? "px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
                : "hidden"
            }
          >
            Add New Product
          </button>
        </div>
      </nav>
      <div className="bg-gray-100 p-4">
        <input
          className="w-full md:w-1/2 lg:w-1/3 p-2 rounded-lg"
          type="search"
          name="searchLibrary"
          placeholder="Search for a library..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <main className="flex-grow container mx-auto p-4 space-y-4">
        {editProductData ? (
          <form
            onSubmit={handleSaveProduct}
            className="bg-gray-100 p-4 rounded-lg"
          >
            <div className="space-y-2">
              <div>
                <label className="block text-gray-700">Product Name:</label>
                <input
                  className="p-2 rounded-lg w-full"
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={editProductData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Category:</label>
                <input
                  className="p-2 rounded-lg w-full"
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={editProductData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Stock:</label>
                <input
                  className="p-2 rounded-lg w-full"
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={editProductData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            {inventoryActions}
          </form>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm">Category: {product.category}</p>
                  <p className="text-sm">Stock: {product.stock}</p>
                  <div className="flex mt-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MainComponent;