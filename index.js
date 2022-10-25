var bodyParser = require("body-parser");
const { json } = require("express");
const express= require("express");
// database connection
const database = require("./database");
//intitializing the express by booky
const booky = express();
// port number to route
booky.use(bodyParser.urlencoded({extended : true}));
booky.use(bodyParser.json());

booky.listen(3000,() => {
    console.log("server is up and running");
});


// to get the book 

booky.get("/", (req,res) => {
    return res.json({books: database.books});

});
// to get specific book
// parameter is isbn

booky.get("/is/:ISBN",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.ISBN
    );
    if(getSpecificBook .length === 0){
        return res.json({error:`no book found for iSBN of ${req.params.ISBN}`});
    }
    return res.json({book:getSpecificBook});
});

// get book based on category

booky.get("/cat/:category" ,(req,res) => {
    const getBookCategory = database.books.filter(
        (books) => books.category.includes(req.params.category)
    );
    if(getBookCategory.length === 0){
        return res.json({error : `no such categorized book found ${req.params.category}`});
    }
    return res.json({books: getBookCategory})
});
// get book  based on language

booky.get("/l/:lang",(req,res) => {
    const getBookLanguage = database.books.filter(
        (books) => books.lang.includes(req.params.lang)
    );
    if (getBookLanguage.length===0){
        return res.json({error:`no such language books ${req.params.lang}`});
    }
    return res.json({books:getBookLanguage});
});

//to get all authors

booky.get("/aut", (req,res)=> {
    return res.json({author:database.author})
});

// to get specific authors

booky.get("/s/:name" ,(req,res)=> {
    const getSpecficAuthor = database.author.filter(
        (author) => author.name === req.params.name
    );
   
    if (getSpecficAuthor.length === 0){
        return res.json({error:`no such author having name ${req.params.name}`});
    }
    return res.json({author:getSpecficAuthor});
});

//get specific book based on autho

booky.get("/aut/books/:isbn" ,(req ,res) => {
    const getSpecificBookAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if(getSpecificBookAuthor.length === 0){
        return res.json({error:`no author found for the books of ${req.params.isbn}`});
    }
    return res.json({author:getSpecificBookAuthor})
});

// to all publication

booky.get("/pub" ,(req,res)=> {
    return res.json({pub:database.publication})
});

// list publication based on book

booky.get("/pub/s/:isbn" ,(req,res) => {
    const getSpecificPub =database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );
    if(getSpecificPub.length===0){
        return res.json({error:`no book publised for ${req.params.isbn}`});
    }
    return res.json({publication:getSpecificPub})
})

// to get specific publication

booky.get("/pub/P/:name",(req,res)=>{
    const specific = database.publication.filter(
        (publication) => publication.name === req.params.name
    );
    if(specific.length === 0) {
        return res.json({error:`no such publication ${req.params.name}`});
    }
    return res.json({pub:specific});
});


//    post 
// add new book
booky.post("/book/new", (req,res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updated:database.books});
});


// add new author

booky.post("/author/new", (req, res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({update : database.author});
});


// add new publication

booky.post("/pub/new", (req, res) => {
    const newPub = req.body;
   
    database.publication.push(newPub);
    
    return res.json({update: database.publication});
});

booky.put("/publication/update/book/:isbn", (req , res) => {
    //update the publication
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubID){
            return pub.books.push(req.params.isbn);
        }
    });
    // update book
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
           book.publication = req.body.pubID;
           return; 
        }
    });
    return res.json(
        {
            books:database.books,
            publ : database.publication,
            msg :"successfuly updated"
        }
    );
});

// delete the book
booky.delete("/book/delete/:isbn",(req, res) => {
    // whichever book that doesnot match isbn jst send to an updated database array rest will be filterded out
    const updatedBook = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBook;
    return res.json({books:database.books});
});

// delete author from book
// booky.delete("/delete/author/:author" ,(req, res) => {
//     const authorDelete = database.books.author.filter (
//         (book) => book.author === req.params.author
//     )
//     database.books=authorDelete;
//     return res.json({books:database.books});
// });

// delete author from book and related book from author
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=> {
    // update the book db
    database.books.forEach((book)=> {
        if(book.ISBN === req.params.isbn){
            const newAuthor = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthor;
            return;
        };
    });

    //update the author database
    database.author.forEach((eachAuthors) => {
        if(eachAuthors.id === parseInt(req.params.authorId)){
            const newBooklist = eachAuthors.books.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthors.books = newBooklist;
            return ;
        }
    });
    return res.json({
        book:database.books,
        author: database.author,
        msg: "author was updated"
    });
    

});
