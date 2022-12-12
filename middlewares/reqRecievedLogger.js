const reqRecievedLogger = (req, res, next) => {
    if (req) {
    console.log(`Recieved request from client!`)
    }
    next();
   }
   module.exports = reqRecievedLogger