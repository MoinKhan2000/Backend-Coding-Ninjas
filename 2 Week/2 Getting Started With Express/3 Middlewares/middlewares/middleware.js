const firstMiddleware = (req, res, next) => {
    console.log('First middleware');
    next();
}
const secondMiddleware = (req, res, next) => {
    res.send('Second middleware');
    next();
}
module.exports = { firstMiddleware, secondMiddleware }