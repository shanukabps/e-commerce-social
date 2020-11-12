import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useStateValue } from "../cotexApi/StateProvider";
import { useHistory } from "react-router-dom";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


function NavBar() {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  // console.log('navbar', user)
  // const [user, setUser] = useState('')

  // useEffect(() => {
  //     setUser(JSON.parse(localStorage.getItem("user")))
  // }, [user])

  const handelLogout = () => {
    localStorage.clear();
    dispatch({
      type: "CLEAR",
    });
    history.push("/signin");
  };

  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="navbar_logo">Social Merchandise</div>
          <div className="navbar_items"></div>
          <div className="navbar_link">
            {user? 
              <>
                <Link to="/" className="active">Home</Link>
                <Link to="/profile">My Shop</Link>
                <Link to="/createpost"> Add Item</Link>
                <Link to="/addtobasket" >    <ShoppingCartIcon/></Link>
         
              </>
            :
        
              <>
                <Link to="/signin">Login</Link>
                <Link to="/register">Register</Link>
              </>
            }
          </div>
      
          

          
            <div className="logout">
                <PowerSettingsNewIcon  onClick={handelLogout} />

           </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
