import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // ✅ Fetch current post data
  useEffect(() => {
    axios.get(`http://localhost:9090/posts/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setAuthor(response.data.author);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  // ✅ Handle form submission (Update post)
  const handleSubmit = async (e) => {
    
    try {
      await axios.put(`http://localhost:9090/posts/${id}`, { title, content, author });
      alert("Post Updated!");
      navigate("/postslist"); // ✅ Redirect to post list after success
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Edit Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="form-control"

          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Content"
          className="form-control"

          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />
        <button className="btn btn-primary" type="submit">Update Post</button>
      </form>
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
  updateButton: {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EditPost;
