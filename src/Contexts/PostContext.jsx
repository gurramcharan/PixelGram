import React, {createContext, useContext, useEffect, useReducer, useState} from "react";
import axios from "axios";
import {postReducer} from "../reducers/PostReducer";
import {AuthContext} from "./AuthContext";
import {toast} from "react-toastify";
export const PostContext = createContext();
export default function Postprovider({children}) {
    const {curr_token, active_user} = useContext(AuthContext);
    const postInitial = {
        isPostLoading: false,
        allpost: [],
        curr_user_post: [],
        homepage_posts: []
    };
    const [displayedit,
        setDisplatedit] = useState(false);
    const [postmedia,
        setPostmedia] = useState("");
    const [edittext,
        setEdittext] = useState("");
    const [postState,
        postDispatch] = useReducer(postReducer, postInitial);

    //All post fetch
    const getAllPosts = async() => {
        postDispatch({type: "loading_post", payload: true});
        const response = await axios.get("/api/posts", {headers: curr_token});
        if (response.status === 200) {
            postDispatch({type: "set_post", payload: response.data.posts});
            postDispatch({type: "loading_post", payload: false});
        }
    };

    //Active user posts fetch
    const getcurruserPost = async(us) => {
        postDispatch({type: "loading_post", payload: true});
        try {
            const response = await fetch(`/api/posts/user/${us}`, {method: "GET"});
            const temp = await response.json();
            if (response.status === 200) {
                postDispatch({type: "set_curr_user_post", payload: temp.posts});
            }
        } catch (error) {
            console.log("error in fetching curr user post", error);
        }
    };

    //Creating a Post
    const createPost = async(e, posttext, reset) => {
        e.preventDefault();
        const postMessage = e.target.elements.post_text.value;
        const resetter = e.target.elements.reset;
        postDispatch({type: "loading_post", payload: true});

        try {
            // const media_info = await createMediaURL(postmedia);
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    authorization: curr_token
                },
                body: JSON.stringify({
                    postData: {
                        content: postMessage,
                        // post_img: media_info.name,
                        // media_type: media_info.type
                    }
                })
            });
            const temp = await response.json();
            if (response.status === 201) {
                postDispatch({type: "loading_post", payload: false});
                postDispatch({type: "set_post", payload: temp.posts});
                setPostmedia("")
                resetter.click();
            }
            if (response.status === 500) {
                toast.error("Server Error try again", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored"
                });
            }
        } catch (error) {
            console.log("error in creating new post", error);
        }
    };

    //Like a post
    const LikePost = async(id) => {
        postDispatch({type: "loading_post", payload: true});
        try {
            const response = await fetch(`/api/posts/like/${id}`, {
                method: "POST",
                headers: {
                    authorization: curr_token
                }
            });

            if (response.status === 201) {
                postDispatch({type: "loading_post", payload: false});
                const temp = await response.json();
                postDispatch({type: "set_post", payload: temp.posts});
            }
        } catch (error) {
            console.log("error in liking a post", error);
        }
    };

    //Dislike a post
    const DislikePost = async(id) => {
        postDispatch({type: "loading_post", payload: true});
        try {
            const response = await fetch(`/api/posts/dislike/${id}`, {
                method: "POST",
                headers: {
                    authorization: curr_token
                }
            });
            if (response.status === 201) {
                postDispatch({type: "loading_post", payload: false});
                const temp = await response.json();
                postDispatch({type: "set_post", payload: temp.posts});
            }
        } catch (error) {
            console.log("error in disliking the post", error);
        }
    };

    //Delete a post
    const postDelete = async(id) => {
        postDispatch({type: "loading_post", payload: false});

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: curr_token
                }
            });
            if (response.status === 201) {
                postDispatch({type: "loading_post", payload: false});
                const temp = await response.json();
                postDispatch({type: "set_post", payload: temp.posts});
            }
        } catch (error) {
            console.log("error in  deleting the post", error);
        }
    };

    //Post Edit
    const postEdit = async(id, content) => {
        try {
            const response = await fetch(`/api/posts/edit/${id}`, {
                method: "POST",
                headers: {
                    authorization: curr_token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({postData: {
                        content
                    }})
            });
            const data = await response.json();
            console.log("res", data)
            postDispatch({type: "set_post", payload: data.posts});
        } catch (error) {
            console.log(error);
        }
    };



    // const ValidatePostMedia = (media) => {
    //     const mediaType = media
    //         .type
    //         .split("/")[0];
    //     const mediaSize = media.size;
    //     if (!(mediaType === "video" || mediaType === "image")) {
    //         return {isValid: false, message: "Only image or video files are allowed"};
    //     } else if (mediaType === "video" && mediaSize / 1024000 > 9.5) {
    //         return {isValid: false, message: "Video size must be less than 10MB..."};
    //     } else if (mediaType === "image" && mediaSize / 1024000 > 4) {
    //         return {isValid: false, message: "Image size must be less than 4MB..."};
    //     } else {
    //         return {isValid: true, message: "valid"};
    //     }
    // };

    // const createMediaURL = async(media) => {
    //     //console.log(media, "media");
    //     if (media.name === undefined || media.name.length === 0 || media.type === undefined) {
    //         return "";
    //     }
    //     const mediaType = media
    //         .type
    //         .split("/")[0];
    //     const formData = new FormData();
    //     formData.append("file", media);
    //     formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
    //     formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    //     try {
    //         const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${mediaType}/upload`, {
    //             method: "POST",
    //             body: formData
    //         });

    //         const temp = await response.json();
    //         const {secure_url} = temp;

    //         const return_value = {
    //             name: secure_url,
    //             type: mediaType
    //         };
    //         console.log(return_value);
    //         return return_value;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    //Trending post sort
    const TrendingHandler = () => {
        const temp = postState
            .allpost
            .sort((a, b) => b.likes.likeCount - a.likes.likeCount);
        return postDispatch({type: "set_post", payload: temp});
    };

    //Late post based on date sort
    const LatestHandler = () => {
        const temp = postState
            .allpost
            .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

        return postDispatch({type: "set_post", payload: temp});
    };

    useEffect(() => {
        getcurruserPost(active_user
            ?.username);
    }, [active_user]);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <PostContext.Provider
            value={{
            postState,
            TrendingHandler,
            LatestHandler,
            createPost,
            postDelete,
            displayedit,
            setDisplatedit,
            LikePost,
            DislikePost,
            postEdit,
            postmedia,
            setPostmedia,
            getcurruserPost,
            edittext,
            setEdittext,
            // ValidatePostMedia,
            // createMediaURL
        }}>
            {children}
        </PostContext.Provider>
    );
}
