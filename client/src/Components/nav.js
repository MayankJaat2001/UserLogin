import { Link ,  useNavigate} from 'react-router-dom';
import logo from '../logo.png'
const Nav = () =>{
        const auth = localStorage.getItem('user')
        if(auth){
            var username = JSON.parse(auth).name
        }
        const navigate = useNavigate()
        const logout=()=>{
            localStorage.clear()
            navigate('/signup')
        }
        // const logo = 'https://e7.pngegg.com/pngimages/494/693/png-clipart-logo-shopping-list-design-product-shopping-list-purple-angle-thumbnail.png'
    return(
        <div className='nav'>
            <img className='logo' src={logo} alt='logo'/>
            {auth?
            <ul className="nav-ul">
            <li><Link to='/'>Products</Link></li>
            <li><Link to='/add'>Add Products</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link onClick={logout} to='/login'>Logout ({username})</Link></li>
            </ul>
            :
            <ul className='nav-ul'>
                <li className='navlogin'><Link to='/login'>Login/Signup</Link></li>
            </ul>
}
        </div>
    )
}
export default Nav;