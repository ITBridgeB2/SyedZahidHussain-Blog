// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Filter from "bad-words"





// function PostForm() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [author, setAuthor] = useState("");
//   const navigate = useNavigate();

  

//   // ✅ Handle form submission
//     const handleSubmit = async (e) => {
//     e.preventDefault();
   
//     try {
//       const filter = new Filter();
//       const containsBadWords = filter.isProfane(content); // ✅ Checks automatically

//      if (containsBadWords) {
//      alert("Your post contains inappropriate words.");
//      return;
//         }
     
//       await axios.post("http://localhost:9090/posts", { title, content, author });
      
        
//       alert("Post Created!");
//       navigate("/postslist"); // ✅ Redirect to PostList after success
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Create a New Blog Post</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//         className="form-control"
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <br />
//         <textarea
//           placeholder="Content"
//           className="form-control"

//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="Author"
//           className="form-control"

//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           required
//         />
//         <br />
//         <button className="btn btn-primary" type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// // ✅ Styles
// const styles = 
// { container: 
//     { textAlign: "center",
//          padding: "40px",
//           fontFamily: "Arial, sans-serif", 
//           backgroundColor: "#f4f4f4", 
//           borderRadius: "10px", 
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//            maxWidth: "700px", margin: "auto", },
//             button: { backgroundColor: "#008080", 
//                 color: "white", 
//                 padding: "10px 20px",
//                  border: "none",
//                   borderRadius: "5px", 
//                   cursor: "pointer", 
//                   fontSize: "16px", 
//                   marginTop: "15px", } 
//                 }
// export default PostForm;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Filter} from "bad-words";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    try {
      const filter = new Filter();
      const containsBadWordsTitle = filter.isProfane(title);
      const containsBadWordsContent = filter.isProfane(content);

      // ✅ Prevent submission if bad words are found
      if (containsBadWordsTitle || containsBadWordsContent) {
        alert("Your post contains inappropriate words. Please remove them.");
        return;
      }

      // ✅ Prevent empty fields
      if (!title.trim() || !content.trim() || !author.trim()) {
        alert("All fields are required!");
        return;
      }

      await axios.post("http://localhost:9090/posts", { title, content, author });

      alert("Post Created Successfully!");
      navigate("/postslist"); // ✅ Redirect to PostList after success
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        
        <select  className="form-control"
          
          placeholder="Title"
          
          onChange={(e) => setTitle(e.target.value)}
          required>
            <option>----Select----</option>
          <option value="Travel">Travel</option>
          <option value="Cooking">Cooking</option>
          <option value="Sports">Sports</option>
          <option value="Social">Social</option>
        </select>
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
          placeholder="Author"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

// ✅ Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "700px",
    margin: "auto",
  },
  button: {
    backgroundColor: "#008080",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
  },
};

export default PostForm;
