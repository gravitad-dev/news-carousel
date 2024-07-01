import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CnnPage from '@/pages/cnnPage';
import PaisPage from '@/pages/paisPage';
import ReuterPage from '@/pages/reuterPage';
import AnalyticsPage from './pages/analyticsPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'cnn',
    element: <CnnPage />,
  },
  {
    path: 'pais',
    element: <PaisPage />,
  },
  {
    path: 'reuters',
    element: <ReuterPage />,
  },
  {
    path: 'analytics/:projectId/:campaignId',
    element: <AnalyticsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
