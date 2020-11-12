import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "./../cotexApi/StateProvider";
import { toast } from "react-toastify";
import axios from "../../axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { DeleteForever } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";

function UserProfile() {
  const { userid } = useParams();

  const [userposts, setposts] = useState([]);
  // const [mypostId, setMypostId] = useState([]);
  const [userProfile, setuserProfile] = useState();
  const [{ user }, dispatch] = useStateValue();
  const [showfollowbutton, setShowfollowbutton] = useState(
    user ? !user.following.includes(userid) : true
  );

  // console.log(userProfile)
  //  myposts.map(a=>{
  //      console.log(a)
  //  })
  // console.log(!user.following.includes(userid))

  //header
  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    axios
      .get(`/user/${userid}`)
      .then((req) => {
        //console.log('aaa',req.data);

        setposts(req.data.posts);
        setuserProfile(req.data.user);
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

  //posts
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("jwt"),
  };

  const unfollowUser = async () => {
    await axios
      .put("/unfollow", { followId: userid }, { headers })
      .then((data) => {
        // console.log("sssas", data.data);
        dispatch({
          type: "UPDATE",
          user: {
            followers: data.data.followers,
            following: data.data.following,
          },
        });
        localStorage.setItem("user", JSON.stringify(data.data));

        setShowfollowbutton(true);

        // setuserProfile(data.data)
        setuserProfile((prevState) => {
          const newFollower = prevState.followers.filter(
            (item) => item != data.data._id
          );
          console.log("swqwq", newFollower);
          return {
            ...prevState,
            followers: newFollower,
          };
        });
      });
  };

  const followUser = async () => {
    await axios
      .put("/follow", { followId: userid }, { headers })
      .then((data) => {
        // console.log("sssas", data.data);
        dispatch({
          type: "UPDATE",
          user: {
            followers: data.data.followers,
            following: data.data.following,
          },
        });
        localStorage.setItem("user", JSON.stringify(data.data));
        setShowfollowbutton(false);

        setuserProfile((prev) => {
          return {
            ...prev,
            followers: [...prev.followers, data.data._id],
          };
        });
      });
  };

  //make comments
  const makeComment = async (text, id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/comments", { postId: id, text: text })
      .then((req) => {
        toast.warning("Comments Posted");
        // console.log("comment", req);

        //instanly updata unlikelike
        const newData = userposts.map((item) => {
          if (item._id === req.data._id) {
            return req.data;
          } else {
            return item;
          }
        });

        setposts(newData);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error("User Login Error"); // some reason error message
        } else {
          toast.error("Network Error Refresh the Page");
        }
      });
  };

  const likePost = async (id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/like", { postId: id })
      .then((req) => {
        toast.info("You recommended ");

        //instanly updata unlikelike
        const newData = userposts.map((item) => {
          if (item._id === req.data._id) {
            return req.data;
          } else {
            return item;
          }
        });

        setposts(newData);
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
        const newData = userposts.map((item) => {
          if (item._id === req.data._id) {
            return req.data;
          } else {
            return item;
          }
        });

        setposts(newData);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error("User Login Error"); // some reason error message
        } else {
          toast.error("Network Error Refresh the Page");
        }
      });
  };

  return (
    <>
      {userProfile ? (
        <div className="profile">
          <div className="profile_header">
            <div className="profile_image">
              <img className="profile_pic" src={userProfile.pic} />
            </div>
            <div className="profile_details">
              <h4>{userProfile.name}</h4>
              <h5>{userProfile.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "40vw",
                }}
                className="profile_rating"
              >
                <h5>{userposts.length} Items</h5>
                <h5>{userProfile.followers.length} Recommended </h5>
                {/* <h5>{userProfile.following.length} followig</h5> */}
              </div>
              {showfollowbutton ? (
                <button className="button" onClick={() => followUser()}>
                  Recommend
                </button>
              ) : (
                <button className="button" onClick={() => unfollowUser()}>
                  Unrecommend
                </button>
              )}
            </div>
          </div>

          <div className="home">
            {userposts.map((item) => {
              return (
                <div className="card home_card userprofilec">
                  <div className="profile_card_delete">
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
                  </div>

                  <h6>{item.title}</h6>
                  <div className="home_body">{item.body}</div>
                  <p>$ {item.price}</p>
                  <h6> {item.unit}</h6>
                  <div className="home__card_image">
                    <img
                      src={item.photo}
                      alt=""
                      className="userprofile__card_image"
                    />
                  </div>
                  <h5 className="likecount">{item.like.length} reccomended</h5>
                  <div className="home_card_content">
                    <div className="home_icon">
                      {item.like.includes(user._id) ? (
                        <div
                          className="home_unlike"
                          onClick={() => unlikePost(item._id)}
                        >
                          <ShareIcon />
                        </div>
                      ) : (
                        <div
                          onClick={() => likePost(item._id)}
                          className="home_like"
                        >
                          <ThumbUpIcon />
                        </div>
                      )}
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        // console.log(e.target[0].value)
                        makeComment(e.target[0].value, item._id);
                      }}
                    >
                      <div className="comment_input_button">
                        <div className="input">
                          <input
                            className="inputhome"
                            type="text"
                            placeholder="add a comment"
                          />
                        </div>
                        <button className="button commentb" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>

                    <div className="comment_box_user">
                      {item.comments.map((comment) => {
                        return (
                          <div className="comment_name">
                            <h5 key={comment._id}>
                              {comment.postedBy.name}{" "}
                              <span key={comment._id}> {comment.text}</span>
                            </h5>
                            <div className="comentdelete">
                              <DeleteIcon fontSize="small" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loding..........</h2>
      )}
    </>
  );
}

export default UserProfile;
