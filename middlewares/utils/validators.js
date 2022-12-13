const userValidator = (req, res, next) => { 
    if (req.body) {
        if (!req.body.userName || 
            !req.body.age || 
            !req.body.gender ||
            !req.body.email ||
            !req.body.password ||
            !req.body.firstName ||
            !req.body.lastName ) {
            res
            .status(400)
            .setHeader('Content-Type', 'text/plain')
            .end('Missing Required Fields')

        }
        else {
            next();
        }

    }
    else {
        res
        .end(`Request for path: ${req.protocol} and method: ${req.method} is missing payload`);
    }
}

const menuValidator = (req, res, next) => { 
    if (req.body) {
        if (!req.body.name || 
            !req.body.restaurant || 
            !req.body.type ||
            !req.body.price ) {
            res
            .status(400)
            .setHeader('Content-Type', 'text/plain')
            .end('Missing Required Fields')

        }
        else {
            next();
        }

    }
    else {
        res
        .end(`Request for path: ${req.protocol} and method: ${req.method} is missing payload`);
    }
}

const restaurantValidator = (req, res, next) => { 
    if (req.body) {
        if (!req.body.name || 
            !req.body.cuisine || 
            !req.body.priceRange) {
            res
            .status(400)
            .setHeader('Content-Type', 'text/plain')
            .end('Missing Required Fields')

        }
        else {
            next();
        }

    }
    else {
        res
        .end(`Request for path: ${req.protocol} and method: ${req.method} is missing payload`);
    }
}

const paymentValidator = (req, res, next) => { 
    if (req.body) {
        if (!req.body.amount || 
            !req.body.currency || 
            !req.body.source ||
            !req.body.description) {
            res
            .status(400)
            .setHeader('Content-Type', 'text/plain')
            .end('Missing Required Fields')

        }
        else {
            next();
        }

    }
    else {
        res
        .end(`Request for path: ${req.protocol} and method: ${req.method} is missing payload`);
    }
}


module.exports = {
    userValidator,
    menuValidator,
    restaurantValidator,
    paymentValidator
}