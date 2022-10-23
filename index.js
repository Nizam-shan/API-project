
const express= require("express");
// database connection
const database = require("./database");
//intitializing the express by booky
const booky = express();
// port number to route
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