module.exports = function(req, res, next){

    res.headers('access-control-allow-origin', '*');
    res.headers('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.headers('access-control-allow-headers', 'Origin, x-Requested-With, content-Type, Accept, Authorization');

    next();
};