import { lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';

const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const DetailPage = lazy(() => import('./components/DetailPage/DetailPage'));
const Page404 = lazy(() => import('./components/Page404/Page404'));

// type IRoutes = {
//   path: string;
//   element: ReactNode | undefined;
//   child: {
//     path: string
//     element: ReactNode | undefined;
//   } | undefined;
// }[];

// const routes: IRoutes = [
//   {
//     path: 'detail',
//     element: undefined,
//     child: {
//       path: ':name',
//       element: <DetailPage />,
//     },
//   },
//   {
//     path: '404',
//     element: <Page404 />,
//     child: undefined,
//   },
// ];

const App = () => (
  <Routes>
    <Route path="/" element={<Outlet />}>
      <Route
        index
        element={
          (
            <Suspense fallback={<div />}>
              <HomePage />
            </Suspense>
          )
        }
      />

      <Route path="detail" element={<Outlet />}>
        <Route
          path=":name"
          element={(
            <Suspense fallback={<div />}>
              <DetailPage />
            </Suspense>
          )}
        />
      </Route>

      <Route
        path="404"
        element={(
          <Suspense fallback={<div />}>
            <Page404 />
          </Suspense>
        )}
      />
      <Route path="*" element={<Navigate replace to="404" />} />
    </Route>
  </Routes>
);

export default App;
