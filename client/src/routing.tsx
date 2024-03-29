import App from './App';
import {createBrowserRouter} from 'react-router-dom'
import { AddNewInsurance } from './pages/AddNewInsurance';
import { RegisterUser } from './pages/Register'
import { Login } from './pages/Login'
import AuthenticationHOC from "./hocs/AuthenticationHOC";
import InsuranceList from "./pages/InsuranceList";
import EditInsurance from "./pages/EditInsurance";
import Dashboard from "./pages/Dashboard";
import ViewInsurance from './pages/ViewInsurance'
import UserRouteGuard from "./hocs/UserRouteGuard";
import Home from './pages/Home'

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: '/home',
          element: <Home />
        },
        {
            path: "/addInsurance",
            element: AuthenticationHOC(UserRouteGuard(AddNewInsurance))
        },
        {
          path: '/register',
          element: <RegisterUser />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/insurancelist',
          element: AuthenticationHOC(InsuranceList)
        },
        {
          path: '/viewInsurance/:id',
          element: AuthenticationHOC(ViewInsurance)
        },
        {
          path: '/editInsurance/:id',
          element: AuthenticationHOC(UserRouteGuard(EditInsurance))
        },
        {
          path: '/dashboard',
          element: AuthenticationHOC(UserRouteGuard(Dashboard))
        }
      ]
    },
  ]);