import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Redux Imports
import { configureStore } from '@reduxjs/toolkit';
import reducers from './slice';
import { Provider } from 'react-redux';

// Router Imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import App from './App';
import CategoryForm from './components/CategoryForm';
import PrivateRoutes from './PrivateRoutes';
import ProductForm from './components/ProductForm';
import SubCategoryForm from './components/SubCategoryForm';
import VariantForm from './components/VariantForm';
import SubVariantForm from './components/SubVariantForm';

// Setting Up Store For Redux
const store = configureStore({ reducer: reducers });

// Setting Up Router
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { element: <h1>Products</h1>, path: '/' },
      {
        element: <PrivateRoutes />,
        children: [
          { path: '/admin/category', element: <CategoryForm /> },
          { path: '/admin/subcategory', element: <SubCategoryForm /> },
          { path: '/admin/products', element: <ProductForm /> },
          { path: '/admin/variants', element: <VariantForm /> },
          { path: '/admin/subvariants', element: <SubVariantForm /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
