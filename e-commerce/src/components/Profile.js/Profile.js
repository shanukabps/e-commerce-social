import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useStateValue } from "./../cotexApi/StateProvider";
import { toast } from "react-toastify";
import axios from "../../axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { DeleteForever } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

function Profile() {
  const [data, setdata] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  //console.log(user)
  //console.log('data',data)

  // console.log('pro', data)

  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("jwt"),
  };

  useEffect(() => {
    // axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    axios
      .get("/mypost", { headers })
      .then((req) => {
        // console.log(req.data);
        setdata(req.data.myposts);
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

  //make comments
  const makeComment = async (text, id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/comments", { postId: id, text: text })
      .then((req) => {
        toast.warning("Comments Posted");
        // console.log("comment", req);

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

  const uploadPhoto = async () => {
    let formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "social-App");
    formData.append("cloud_name", "dcfrl1b41");

    await axios
      .post("https://api.cloudinary.com/v1_1/dcfrl1b41/image/upload", formData)
      .then((req) => {
        //   console.log('server',req.data);

        setUrl(req.data.url);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, pic: req.data.url })
        );

        dispatch({
          type: "UPDATEPIC",
          user: {
            pic: req.data.url,
          },
        });
        if (url) {
          axios
            .put("/updatepic", { pic: url }, { headers })
            .then((req) => {
              toast.success("Image Changed");
              setUrl("");
              // console.log('aftersave',req.data);
            })
            .catch((e) => {
              if (e.response && e.response.data) {
                toast.error(e.response.data.error.message); // some reason error message // some reason error message
                console.log("body pst", e.response.data.error.message);
              } else {
                toast.error("Network Error");
                console.log("ad", e);
              }
            });
        }
      })

      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error(e.response.data.error.message); // some reason error message // some reason error message
          console.log("body pst", e.response.data.error.message);
        } else {
          toast.error("Network Error");
          console.log("ad", e);
        }
      });
  };

  // console.log("url", url);

  return (
    <div className="profile">
      <div>
        <div className="profile_header">
          <div className="profile_image">
            <img className="profile_pic" src={user ? user.pic : "Loding"} />
            <div className="profilechange">
              <button
                className="button"
                onClick={() => uploadPhoto()}
                type="submit"
              >
                change Shop banner
              </button>
              <div className="input custominput">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="profile_details">
            <h4>{user.name}</h4>
            <h6>{user.email}</h6>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "25vw",
              }}
              className="profile_rating"
            >
              <h5>{data.length} Items</h5>
              <h5>{user.followers.length} Recommended Your Shop</h5>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="profile_gallery ">
          {data.map((item) => {
            return (
              <div className="card home_card profilec  gallery_item">
                <div className="profile_card_delete">
                  <h3>{item.postedBy.name}</h3>

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
                  <img
                    src={item.photo}
                    alt=""
                    className="profile__card_image"
                  />
                </div>
                <h5 className="likecount">{item.like.length} reccomended</h5>
                <div className="home_card_content">
                  <div className="home_icon"></div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // console.log(e.target[0].value)
                      makeComment(e.target[0].value, item._id);
                    }}
                  >
                    <div className="commentbox_profile">
                      <div className="input_profile">
                        <input
                          className="inputpro"
                          type="text"
                          placeholder="add a comment"
                        />
                      </div>
                      <button className="button commentb" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>

                  <div className="comment_box cprofile">
                    {item.comments.map((comment) => {
                      return (
                        <div className="comment_name">
                          <h5 key={comment._id}>
                            {comment.postedBy.name}
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
    </div>
  );
}

export default Profile;
