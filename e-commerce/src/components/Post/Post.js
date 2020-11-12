import React from "react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import { useStateValue } from "./../cotexApi/StateProvider";
import { DeleteForever } from "@material-ui/icons";

function Post() {
  const { postid } = useParams();

  const [item, setposts] = useState();
  const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    axios
      .get(`/post/${postid}`)
      .then((req) => {
        console.log('aaa',req.data);

        setposts(req.data);
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

//   console.log("aaa", item);
//   if(item){
//  console.log("aaa", item.postedBy._id);
//   }
  
  const deletePost = async (postid) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .delete(`/deletepost/${postid}`)
      .then((result) => {
        toast.success("Item Deleted");
      })
      .catch((err) => console.log(err.message));
  };

  const makeComment = async (text, id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/comments", { postId: id, text: text })
      .then((req) => {
        toast.warning("Comments Posted");
        // console.log("comment", req);

        //instanly updata unlikelike

        setposts(req.data);
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
        setposts(req.data);
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
        setposts(req.data);
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
    <div>



      {item ? (
        <>
          <div className="home">
            <div className="card home_card profilec">
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
              <h6> {item.unit}</h6>
              <div className="home__card_image">
                <img src={item.photo} alt="" className="profile__card_image" />
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

                <div className="comment_box">
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
          </div>
        </>
      ) : (
        <div className="loding">
          <h1>Loding....</h1>
        </div>
      )}
    </div>
  );
}

export default Post;
