const User = require("../models/User");

const getUsers = async (req, res, next) => {

    const filter = {};
    const options = {};
    if (Object.keys(req.query).length) {
        const {
            userName,
            gender,
            email,
            password,
            firstName,
            lastName,
            limit,
            age,
            sortByAge
        } = req.query

        if (userName) filter.userName = true;
        if (gender) filter.gender = true;
        if (email) filter.email = true;
        if (password) filter.password = true;
        if (firstName) filter.firstName = true;
        if (lastName) filter.lastName = true;
        if (age) filter.age = true;

        if (limit) options.limit = limit;
        if (sortByAge) {
            options.sort = {
              age: sortByAge === 'asc' ? 1 : -1
            };
          }
    }

    try { 
        const users = await User.find( filter, options, {} );
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(users)
    }
    catch (err) {
        throw new Error(`Error retrieving User: ${err.message}`);
    }


}

const postUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(user)
    }
    catch (err)
    {
        throw new Error(`Error deleting Users: ${err.message}`);
    }
}

const deleteUsers = async (req, res, next) => {
    try {
    await User.deleteMany();
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg:'Deleted all User'})
        }
    catch (err) {
        throw new Error(`Error retrieving User:${err.message}`)
                }
            }


//! For /:UserID endpoint: 

const getUser = async (req, res, next) => {
    
    
    try {
        const user = await User.findById(req.params.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user) 
    }
    catch (err) {
        throw new Error(`Error retrieving User with ID of: ${req.params.userId} ${err.message}`)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, { new: true});
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user) 
    }
    catch (err) {}
        throw new Error(`Error updating User with ID of: ${req.params.userId} ${err.message}`)
    }

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.UserId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: `Delete the User with id: ${req.params.userId}`}) 
    }
    catch (err) {
        throw new Error(`Error deleting User with ID of: ${req.params.userId} ${err.message}`)
    }
}

//! For /:UserID endpoint: 
//! For /:UserID/: endpoint: 

const login = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) throw new Error('Please provide an email and password');
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Invalid Credentials')
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error('Invalid Credentials');
    sendTokenResponse(user, 200, res);

}

const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) throw new Error('No user found');
    const resetToken = user.getResetPasswordToken();

    try {
        await user.save({
            validateBeforeSave: false
        })

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Password has been reset with token: ${resetToken}`
        })
    }
    catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({
            validateBeforeSave: false
        });
        throw new Error ('Failed to save reset password token');
    }

    }

const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex');
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    })
    if (!user) throw new Error ('Invalid token');

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save()
    sendTokenResponse(user, 200, res)

}

const updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const passwordMatches = await user.matchPassword(req.body.password);
    if (!passwordMatches) throw new Error('password is incorrect');

    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res)
}

const logout = async (req, res, next) => {
    res
    .status(200)
    .cookie('token','none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    .json({
        success: true,
        msg: 'Successfully logged out!'
    })
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') options.secure = true;

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token})
}


module.exports = {
    
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser,
    login,
    forgotPassword,
    resetPassword,
    logout,
    updatePassword

}