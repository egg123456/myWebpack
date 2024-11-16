import './App.css';
import React, { useEffect } from 'react';
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
const G2 = React.lazy(() => import(/* webpackPreload: true */ './routes/G2/index'));
const Algorithm = React.lazy(() => import(/* webpackPreload: true */ './routes/Algorithm/index'));

var r = require.context('./routes', true, /\/route\.js$/) //返回function
// var r = require.context('./routes', true, /^\.\/[a-z\-A-Z]+\/index\.js$/) //返回function
console.log(r.keys(), 'rrrr')
const routes = [];
r.keys().forEach(key => {   //r.keys()返回匹配成功模块的名字组成的数组
  let list = r(key); // r(key)返回的是一个模块,这个模块才是真正我们需要的
  console.log(list, 'mmmm');
  list.forEach(el => {
    const basePath = key.slice(1).replace('route.js', '')
    const Comp = React.lazy(() => import(/* webpackPreload: true */ './routes' + basePath + el.view))
    routes.push({
      path: el.url,
      element: <Comp />,
    });
  })
});

console.log(routes, 'routes', <Layout id={1} key="99" />, Layout)

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
      {
        path: "g2",
        element: <G2 />,
      },
      {
        path: "algorithm",
        element: <Algorithm />,
      },
      ...routes,
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
