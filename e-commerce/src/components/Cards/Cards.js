// import React from 'react'
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { DeleteForever } from "@material-ui/icons";
// import DeleteIcon from "@material-ui/icons/Delete";

// import ThumbDownIcon from '@material-ui/icons/ThumbDown';
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import { useStateValue } from './../cotexApi/StateProvider';
// import axios from "../../axios";


// function Cards(data,postedBy,_id,title,body,photo,like,price,unit) {
    
//     const [{ user }, dispatch] = useStateValue();
    
    

// const likePost = async (id) => {
//     axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
//     await axios
//       .put("/like", { postId: id })
//       .then((req) => {
//         toast.info("You recommended ");

//         //instanly updata unlikelike
//         const newData = data.map((item) => {
//           if (item._id === req.data._id) {
//             return req.data;
//           } else {
//             return item;
//           }
//         });

//         setdata(newData);
//         //  console.log('posts', data)
//       })
//       .catch((e) => {
//         if (e.response && e.response.data) {
//           toast.error("User Login Error"); // some reason error message
//           console.log(e.response.data);
//         } else {
//           toast.error("Network Error Refresh the Page");
//         }
//       });
//   };

//   const unlikePost = async (id) => {
//     axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
//     await axios
//       .put("/unlike", { postId: id })
//       .then((req) => {
//         toast.warning("Unliked");
//         //  console.log('posts', req.posts)

//         //instanly updata unlikelike
     
//           if (id === req.data._id) {
//             return req.data;
//           } else {
//             return item;
//           }
     

//         setdata(newData);
//       })
//       .catch((e) => {
//         if (e.response && e.response.data) {
//           toast.error("User Login Error"); // some reason error message
//         } else {
//           toast.error("Network Error Refresh the Page");
//         }
//       });
//   };











    
//     return (
//             <div className="homeS">
   
      
       
//           <div className="card home_card">
//             <div className="home_card_delete">
//               <h3>
//                 <Link
//                   className="name_link"
//                   to={
//                     postedBy._id !== user._id
//                       ? "/profile/" + postedBy._id
//                       : "/profile"
//                   }
//                 >
//                   {postedBy.name}
//                 </Link>
//               </h3>

//               {postedBy._id === user._id && (
//                 <div
//                   onClick={() => deletePost(_id)}
//                   className="deleteicon"
//                 >
                
//                   <DeleteForever />
//                 </div>
//               )}
//             </div>

//             <h6>{title}</h6>
//             <div className="home_body">{body}</div>
//             <p>$ {price}</p>
//             <h6>store {unit}</h6>

//                     <Link
//                   className="name_link"
//                   to={"/post/" + _id }
//                 >
//                 <div className="home__card_image">
//               <img src={photo} alt="" className="home_img" />
//             </div>
//                 </Link>
           
//             <h5 className="likecount">{like.length} people recommended</h5>
//             <div className="home_card_content">
//               <div className="home_icon">
              

//                 {like.includes(user._id) ? (
//                   <div
//                     className="home_unlike"
//                     onClick={() => unlikePost(_id)}
//                   >
//                     <ThumbDownIcon />
//                   </div>
//                 ) : (
//                   <div onClick={() => likePost(_id)} className="home_like">
//                     <ThumbUpIcon />
//                   </div>
//                 )}
//                    <button className="buttonb"  >Add to Cart</button>
//               </div>
             
//             </div>
//           </div>
//         );
      
//     </div>
//     )
// }

// export default Cards
