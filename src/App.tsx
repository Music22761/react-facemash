import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './Page/Home'
import LoginPage from './Page/Login'
import RegisterPage from './Page/Register'
import HomePageAfterLogin from './Page/HomeAfterLogin'
import ProfilePage from './Page/Profile'

const routers = createBrowserRouter(
  [
    { path:"/", element:<HomePage/>},
    { path:"/login", element:<LoginPage/>},
    { path:"/register", element:<RegisterPage/>},
    { path:"/homeAfterLog", element:<HomePageAfterLogin/>},
    { path:"/profile", element:<ProfilePage/>}
  ]
)

function App() {
 return(
  <RouterProvider router ={routers}/> 
 )
}

export default App
