const express = require("express");
const bcrypt=require("bcryptjs")
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const PORT = 9090;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON requests

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "itbridge",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});
const session = require("express-session");

app.use(session({
    secret: "password", // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set `true` if using HTTPS
}));
//require login
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
  }
  next();
};
//logout

app.post("/logout", (req, res) => {
  req.session.destroy(err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Logged out successfully" });
  });
});

//post
app.post("/addpost", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

  const { title, content } = req.body;
  const query = `INSERT INTO posts (title, content, author, created_at) VALUES (?, ?, ?, NOW())`;

  db.query(query, [title, content, req.session.user.username], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Post added successfully!" });
  });
});
//only users post
app.get("/myposts", (req, res) => {
 // if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

  const query = `SELECT id, title, content, created_at FROM posts WHERE author = ?`;
  db.query(query, [req.session.user.username], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json(results);
  });
});



// Protect blog post actions
app.post("/create-post", requireLogin, (req, res) => {
  res.json({ message: "Post created successfully!" });
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      // Store user in session
      const { username } = req.body;
      req.session.username = username;
      res.cookie("username", username, { maxAge: 3600000, httpOnly: true });
      req.session.user = { id: user.id, username: user.username };
      res.json({ message:""+user.username, user: req.session.user });
  });
});




// Register User Route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully" });
  });
});

//post
app.post("/posts", async (req, res) => {
    const { title, content, author } = req.body;
  
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Title, content, and author are required" });
    }
  
    const sql = "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)";
    db.query(sql, [title, content, author], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
  
      res.status(201).json({
        id: result.insertId,
        title,
        content,
        author,
        created_at: new Date(),
      });
    });
  });
  // // all post
  // app.get("/posts", async (req, res) => {
  //   db.query("SELECT * FROM posts ", (err, results) => {
  //     if (err) return res.status(500).json({ error: "Database error" });
  
  //     res.status(200).json(results);
  //   });
  // });
  // Fetch Posts by Author
// 



// ✅ Get Posts by Author
app.get("/posts1/:username", (req, res) => {
  const { username } = req.params;

  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Invalid username provided." });
  }

  db.query("SELECT * FROM posts WHERE author = ?", [username], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts found for this author." });
    }

    res.json(results);
  });
});

  // login user blog
  app.get("/blogs/travel", (req, res) => {
    const query = `SELECT * FROM posts WHERE title = 'Travel'`;
  
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
  
        res.json(results);
    });
  });

//travel bolg
app.get("/blogs/travel", (req, res) => {
  const query = `SELECT * FROM posts WHERE title = 'Travel'`;

  db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json(results);
  });
});
//cooking blog
app.get("/blogs/cooking", (req, res) => {
  const query = `SELECT * FROM posts WHERE title = 'Cooking'`;

  db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json(results);
  });
});
//sports
app.get("/blogs/sports", (req, res) => {
  const query = `SELECT * FROM posts WHERE title = 'Sports'`;

  db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json(results);
  });
});
//social
app.get("/blogs/social", (req, res) => {
  const query = `SELECT * FROM posts WHERE title = 'Social'`;

  db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json(results);
  });
});

//-----------
app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (result.length === 0) return res.status(404).json({ error: "Post not found" });
  
      res.status(200).json(result[0]);
    });
  });
//------------------
app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
  
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Title, content, and author are required" });
    }
  
    const sql = "UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?";
    db.query(sql, [title, content, author, id], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found" });
  
      res.status(200).json({ id, title, content, author });
    });
  });
//------------------
app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
  
    db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found" });
  
      res.status(204).end(); // No content response on success
    });
  });
  
  

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
