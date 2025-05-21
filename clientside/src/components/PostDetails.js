import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch post details from backend
  useEffect(() => {
    axios.get(`http://localhost:9090/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  // ✅ Delete post function
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9090/posts/${id}`);
      alert("Post Deleted!");
      navigate("/"); // ✅ Redirect to PostList after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>{post.title}</h1>
      <p><strong>Author:</strong> {post.author}</p>
      <p>{post.content}</p>
      <p><strong>Created on:</strong> {new Date(post.created_at).toLocaleDateString()}</p>

      <Link to={`/posts/${id}/edit`}>
        <button  className="btn btn-primary">Edit</button>
      </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={handleDelete} class="btn btn-danger">Delete</button>
      <br />
      <Link to="/">Back to Posts</Link>
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
  editButton: {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PostDetails;
