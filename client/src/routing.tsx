import App from './App';
import {createBrowserRouter} from 'react-router-dom'
import { AddNewInsurance } from './pages/AddNewInsurance';
import { RegisterUser } from './pages/Register'
import { Login } from './pages/Login'
import AuthenticationHOC from "./hocs/AuthenticationHOC";
import InsuranceList from "./pages/InsuranceList";
import EditInsurance from "./pages/EditInsurance";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [

        {
            path: "/addInsurance",
            element: AuthenticationHOC(AddNewInsurance)
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
          path: '/editInsurance/:id',
          element: AuthenticationHOC(EditInsurance)
        },
        {
          path: '/dashboard',
          element: AuthenticationHOC(Dashboard)
        }
      ]
    },
  ]);