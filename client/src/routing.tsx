import App from './App';
import {createBrowserRouter} from 'react-router-dom'
import { AddNewInsurance } from './pages/AddNewInsurance';
import { RegisterUser } from './pages/Register'
import { Login } from './pages/Login'
import InsuranceList from "./pages/InsuranceList";
import EditInsurance from "./pages/EditInsurance";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [

        {
            path: "/addInsurance",
            element: <AddNewInsurance />
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
          element: <InsuranceList />
        },
        {
          path: '/editInsurance/:id',
          element: <EditInsurance />
        }
      ]
    },
  ]);