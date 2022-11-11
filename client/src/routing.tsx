import App from './App';
import {createBrowserRouter} from 'react-router-dom'
import { AddNewInsurance } from './pages/AddNewInsurance';
import { RegisterUser } from './pages/register'


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
        }


      ]
    },
  ]);