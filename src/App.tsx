import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './Page/Home'
import LoginPage from './Page/Login'
import RegisterPage from './Page/Register'

const routers = createBrowserRouter(
  [
    { path:"/", element:<HomePage/>},
    { path:"/login", element:<LoginPage/>},
    { path:"/register", element:<RegisterPage/>}
  ]
)

function App() {
 return(
  <RouterProvider router ={routers}/> 
 )
}

export default App
