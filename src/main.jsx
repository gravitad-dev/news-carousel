import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  AnalyticsPage,
  AnalyticsPageTesting,
  ReuterPage,
  ReuterPageTesting,
  CnnPage,
  CnnPageTesting,
  PaisPage,
  PaisPageTesting,
} from './pages';
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
    path: 'cnn/testing',
    element: <CnnPageTesting />,
  },
  {
    path: 'pais',
    element: <PaisPage />,
  },
  {
    path: 'pais/testing',
    element: <PaisPageTesting />,
  },
  {
    path: 'reuters',
    element: <ReuterPage />,
  },
  {
    path: 'reuters/testing',
    element: <ReuterPageTesting />,
  },
  {
    path: 'analytics/:projectId/:campaignId',
    element: <AnalyticsPage />,
  },
  {
    path: 'analytics/testing/:projectId/:campaignId',
    element: <AnalyticsPageTesting />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
