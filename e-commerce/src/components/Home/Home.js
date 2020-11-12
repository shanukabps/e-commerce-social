import React, { useEffect, useState } from "react";
import "./Home.css";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import { useStateValue } from '../cotexApi/StateProvider';
import axios from "../../axios";
import { toast } from "react-toastify";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { useStateValue } from "./../cotexApi/StateProvider";
import { DeleteForever } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

function Home() {
  const [data, setdata] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [search, setsearch] = useState([]);
  const [oldData, setOldData] = useState([]);

  useEffect(() => {
    // axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwt');
    axios
      .get("/allpost")
      .then((req) => {
        //  console.log(req.data);
        setdata(req.data.posts);
        setOldData(req.data.posts);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error(e.response.data); // some reason error message
        } else {
          console.log(e.message);
          toast.error("Network Error");
        }
      });
  }, []);

  useEffect(() => {
    if (search) {
      // console.log('hsear', search)
      const newData = data.filter((item) => {
        return item.title.toLowerCase().includes(search);
      });

      setdata(newData);
    } else {
      setdata(oldData);
    }
  }, [search]);

  const likePost = async (id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/like", { postId: id })
      .then((req) => {
        toast.info("You recommended ");

        //instanly updata unlikelike
        const newData = data.map((item) => {
          if (item._id === req.data._id) {
            return req.data;
          } else {
            return item;
          }
        });

        setdata(newData);
        //  console.log('posts', data)
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error("User Login Error"); // some reason error message
          console.log(e.response.data);
        } else {
          toast.error("Network Error Refresh the Page");
        }
      });
  };

  const unlikePost = async (id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/unlike", { postId: id })
      .then((req) => {
        toast.warning("Unliked");
        //  console.log('posts', req.posts)

        //instanly updata unlikelike
        const newData = data.map((item) => {
          if (item._id === req.data._id) {
            return req.data;
          } else {
            return item;
          }
        });

        setdata(newData);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error("User Login Error"); // some reason error message
        } else {
          toast.error("Network Error Refresh the Page");
        }
      });
  };

  const deletePost = async (postid) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .delete(`/deletepost/${postid}`)
      .then((result) => {
        // console.log(result);
        //instanly delete unlikelike
        const newData = data.filter((item) => {
          return item._id !== result.data._id;
        });

        setdata(newData);
      })
      .catch((err) => console.log(err.message));
  };

  const addToBasket = (item) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: item._id,
        title: item.body,
        image: item.photo,
        price: item.price,
      },
    });
  };

  return (
    <div>
      <div className="seachitem">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          type="text"
        ></input>
        <SearchIcon />
      </div>
      <div className="homeS">
        {data.map((item) => {
          return (
            <div className="card home_card">
              <div className="home_card_delete">
                <h3>
                  <Link
                    className="name_link"
                    to={
                      item.postedBy._id !== user._id
                        ? "/profile/" + item.postedBy._id
                        : "/profile"
                    }
                  >
                    {item.postedBy.name}
                  </Link>
                </h3>

                {item.postedBy._id === user._id && (
                  <div
                    onClick={() => deletePost(item._id)}
                    className="deleteicon"
                  >
                    <DeleteForever />
                  </div>
                )}
              </div>

              <h6>{item.title}</h6>
              <div className="home_body">{item.body}</div>
              <p>$ {item.price}</p>
              <h6>store {item.unit}</h6>

              <Link className="name_link" to={"/post/" + item._id}>
                <div className="home__card_image">
                  <img src={item.photo} alt="" className="home_img" />
                </div>
              </Link>

              <h5 className="likecount">
                {item.like.length} people recommended
              </h5>
              <div className="home_card_content">
                <div className="home_icon">
                  {item.like.includes(user._id) ? (
                    <div
                      className="home_unlike"
                      onClick={() => unlikePost(item._id)}
                    >
                      <ThumbDownIcon />
                    </div>
                  ) : (
                    <div
                      onClick={() => likePost(item._id)}
                      className="home_like"
                    >
                      <ThumbUpIcon />
                    </div>
                  )}
                  <button className="buttonb" onClick={() => addToBasket(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
