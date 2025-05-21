import { useEffect, useState } from "react";
import axios from "axios";
import { data, Link } from "react-router-dom";
import Login from "../login";

function PostList() {
  const [posts, setPosts] = useState([]);
   const [uname,setUname]=useState('')
  // // ✅ Fetch posts from backend
  // useEffect(() => {
  
  //   axios.get("http://localhost:9090/login")
  //     .then((response1) => setuname(response1.data))
  //     alert(uname.username)
  //     ///
  //   axios.get("http://localhost:9090/posts1/"+uname)
  //     .then((response) => setPosts(response.data))
  //     .catch((error) => console.error("Error fetching posts:", error));
  // }, []);

  // ✅ Fetch logged-in username first
  // useEffect(() => {
  //   axios.get("http://localhost:9090/login", { withCredentials: true }) // Ensure credentials are passed
  //     .then((response) => {
  //       setUname(response.data.message);
  //       alert(response.data.message)
  //     })
      
  //     .catch((error) => console.error("Error fetching username:", error));
  // }, []);
    

  // ✅ Fetch posts only when `uname` is updated
  const user=localStorage.getItem("username")

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:9090/posts1/${user}`)
        .then((response) => setPosts(response.data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [user]);

  // ✅ Delete post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id)); // ✅ Remove from UI dynamically
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      
    <div style={styles.container}>
      <h1>All Blog Posts</h1>
     

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={styles.postItem}>
            <h2>{post.title}</h2>
            <p><strong>Author:</strong> {post.author}</p>
            <Link to={`/posts/${post.id}`}>View Details</Link>
            <Link to={`/posts/${post.id}/edit`}>
              <button className="btn btn-primary">Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
            <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/create">
     <button className="btn btn-info">+ Create New Post</button>
   </Link>
    </div>
    
   </div>
  );
}

// ✅ Styles
const styles = {
    container: 
    { textAlign: "center",
         padding: "40px",
          fontFamily: "Arial, sans-serif", 
          backgroundColor: "#f4f4f4", 
          borderRadius: "10px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
           maxWidth: "700px", margin: "auto", },
  postItem: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
  },
  createButton: {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "blue",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default PostList;
