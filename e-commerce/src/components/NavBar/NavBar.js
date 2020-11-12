import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useStateValue } from "../cotexApi/StateProvider";
import { useHistory } from "react-router-dom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";

function NavBar() {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  // console.log('navbar', user)

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
          <div className="navbar_log">
            <Link key="1a" to="/">
              <div>
                <HomeIcon />
              </div>
            </Link>
          </div>

          <div className="navbar_items"></div>
          <div className="navbar_link">
            {user ? (
              <>
                <Link key="2a" to="/profile">
                  My Shop
                </Link>
                <Link key="3a" to="/createpost">
                  {" "}
                  Add Item
                </Link>
                <Link key="4a" to="/addtobasket">
                  {" "}
                  <ShoppingCartIcon />
                </Link>
              </>
            ) : (
              <>
                <Link key="5a" to="/signin">
                  Login
                </Link>
                <Link key="6a" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="logout">
            <PowerSettingsNewIcon onClick={handelLogout} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
