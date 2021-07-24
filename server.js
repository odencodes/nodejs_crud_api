let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect mysql database
let conn = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_api'
})

conn.connect();

app.get('/', (req, res) => {
    return res.json({
        error: false, 
        message: 'Welcome to RESTfull api with node js.'
    });
})

app.get('/posts', (req, res) => {
    conn.query("SELECT * FROM posts", (error, results) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "post is empty";
        } else {
            message = "Successfully retrived all books";
        }

        return res.json({
            error: false,
            message: message,
            data: results
        });
    })
})

app.post('/createPost', (req, res) => {
    let title = req.body.title;
    let post = req.body.post;

    //check validation
    if (!title || !post) {
        return res
        .status(400)
        .send({
            error: true,
            message: "Please provide title ane post"
        });
    } else {
        let values = [title, post];
        conn.query('INSERT INTO posts (title, post) VALUES(?, ?)', values, (error, results, fields) => {
            if (error) throw error;
            return res.send({
                error: false,
                message: 'Post successfully added',
                data: []
            })
        });
    }
})

app.put('/updatePost', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let post = req.body.post;

    //check validation
    if (!title || !post || !id) {
        return res
        .status(400)
        .send({
            error: true,
            message: "Please provide id, title and post"
        });
    } else {
        let values = [title, post, id];
        conn.query('UPDATE posts SET title = ?, post = ? WHERE id = ?', values, (error, results, fields) => {
            if (error) throw error;

            let message = ""
            if (results.changedRows === 0) {
                message = "Post not found or data are same"
            } else {
                message = "Post successfully updated"
            }

            return res.send({
                error: false,
                message: message,
                data: []
            })
        });
    }
})

app.delete('/deletePost', (req, res) => {
    let id = req.body.id;

    //check validation
    if (!id) {
        return res
        .status(400)
        .send({
            error: true,
            message: "Please provide book id"
        });

    } else {
        let values = [id];
        conn.query('DELETE FROM posts WHERE id = ?', values, (error, results, fields) => {
            if (error) throw error;

            let message = "";

            if (results.affectedRows === 0) {
                message = "Post not found";
            } else {
                message = "Post successfully deleted";
            }

            return res.send({
                error: false,
                message: message,
                data: []
            })
        });
    }
})


app.listen(port, () => {
    console.log("Listening on port %d", port);
})

module.exports = app;