import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import { initSDK } from '@embrace-io/web-sdk';

import App from './App';
import './index.css';

const Name = () => {
  const { name } = useParams();
  return (
    <div>
      {name} <Link to={'/'}>Home</Link>
    </div>
  );
};

const Pet = () => {
  const { name, pet } = useParams();
  return (
    <div>
      {name} has a pet {pet}
      <Link to={`/name/${name}`}>Back to person</Link>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'name/:name',
    element: <Name />,
  },
  {
    path: 'name/:name/pet/:pet',
    element: <Pet />,
  },
]);

try {
  initSDK({
    appID: 'zbetj',
    appVersion: '0.0',
  });

  console.log('Successfully initialized the Embrace SDK');
} catch (err) {
  console.error(err);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
