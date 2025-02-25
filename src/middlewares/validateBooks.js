const validateBook = (req,res,next)=>{
    const {title,author,pubYear,price} = req.body
    if( !title || !author || !pubYear || !price) {
        return res.status(400).send('Book details are required')
    }
    next()
}

module.exports = validateBook;