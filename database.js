const books= [
    {
        ISBN: "123456book",
        title: "tesla",
        pubDate : "22-09-2022",
        lang: "en",
        numPage: 200,
        author :[1,2],
        publication:[1],
        category:["tech","space","education"]
    }
]

const author = [
    {
        id:1,
        name:"nizam",
        books:["123456book","secretbook"]
    },
    {
        id:2,
        name: "elon musk",
        books:["123456book"]
    }
]
const publication = [
    {
        id:1,
        name:"writex",
        books:["123456book"]
    },
    {
        id:2,
        name:"writex2",
        books:[]
    }
]

module.exports= {books , author ,publication};