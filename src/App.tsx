import { lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const Page404 = lazy(() => import('./components/Page404/Page404'));

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/404',
    element: <Page404 />,
  },
];

const App = () => (
  <Routes>
    {routes.map((router) => (
      <Route
        key={router.path}
        path={router.path}
        element={(
          <Suspense fallback={<div />}>
            {router.element}
          </Suspense>
        )}
      />
    ))}
    <Route path="*" element={<Navigate replace to="/404" />} />
  </Routes>
);

export default App;
