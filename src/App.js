import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './common/error-page';
import Layout from './Layout';

const Login = React.lazy(() => import(/* webpackPreload: true */ './common/login'));
const Overview = React.lazy(() => import(/* webpackPreload: true */ './routes/overview/index'));
const Ceremony = React.lazy(() => import(/* webpackPreload: true */ './routes/ceremony/index'));
const CeremonyBooks = React.lazy(() => import(/* webpackPreload: true */ './routes/ceremony/ceremonyBooks'));
const CeremonyDetail = React.lazy(() => import(/* webpackPreload: true */ './routes/ceremony/ceremonyDetail'));
const SmallFunc = React.lazy(() => import(/* webpackPreload: true */ './routes/smallFunc/index'));
const ProjectSchedule = React.lazy(() => import(/* webpackPreload: true */ './routes/projectSchedule/index'));
const EventList = React.lazy(() => import(/* webpackPreload: true */ './routes/eventManage/index'));
const Scheduling = React.lazy(() => import(/* webpackPreload: true */ './routes/eventManage/scheduling'));
const PlanList = React.lazy(() => import(/* webpackPreload: true */ './routes/eventManage/planList'));
const FestivalInfoList = React.lazy(() => import(/* webpackPreload: true */ './routes/festivalInfoManage/index'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "ceremony",
        element: <Ceremony />,
      },
      {
        path: "ceremonyBooks",
        element: <CeremonyBooks />,
      },
      {
        path: "ceremonyDetail",
        element: <CeremonyDetail />,
      },
      {
        path: "smallFunc",
        element: <SmallFunc />,
      },
      {
        path: "projectSchedule",
        element: <ProjectSchedule />,
      },
      {
        path: "event/list",
        element: <EventList />,
      },
      {
        path: "event/scheduling",
        element: <Scheduling />,
      },
      {
        path: "event/planList",
        element: <PlanList />,
      },
      {
        path: "festivalInfo/List",
        element: <FestivalInfoList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
], 
{ basename: '/view' }
);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
