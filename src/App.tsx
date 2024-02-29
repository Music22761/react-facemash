import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './Page/Home'
import LoginPage from './Page/Login'
import RegisterPage from './Page/Register'
import HomePageAfterLogin from './Page/User/HomeAfterLogin'
import ProfilePage from './Page/User/Profile'
import AddPicture from './Page/User/AddPicture'
import RankPage from './Page/Rank'
import AdminHome from './Page/Admin/AdminHome'
import PasswordChangePage from './Page/User/PasswordChange'
import ProfileUserPage from './Page/Admin/ProfileUser'
import EditPicture from './Page/User/EditPicture'
import InfoPicture from './Page/Admin/InfoPicture'
import ChartPicture from './Page/ChartPicture'

const routers = createBrowserRouter(
  [
    { path:"/", element:<HomePage/>},
    { path:"/login", element:<LoginPage/>},
    { path:"/register", element:<RegisterPage/>},
    { path:"/homeAfterLog", element:<HomePageAfterLogin/>},
    { path:"/profile", element:<ProfilePage/>},
    { path:"/profileUser", element:<ProfileUserPage/>},
    { path:"/addPicture", element:<AddPicture/>},
    { path:"/editPicture", element:<EditPicture/>},
    { path:"/rank", element:<RankPage/>},
    { path:"/adminHome", element:<AdminHome/>},
    { path:"/infoPicture", element:<InfoPicture/>},
    { path:"/passwordChange", element:<PasswordChangePage/>},
    { path:"/chartPicture", element:<ChartPicture/>},
  ]
)

function App() {
 return(
  <RouterProvider router ={routers}/> 
 )
}

export default App
