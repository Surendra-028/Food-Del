const jwt = require('jsonwebtoken')

const restrictToLoginUserOnly = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({success : false, message : "Login First"})
    }
    try {
        const token_decode = await jwt.verify(token, process.env.JWT_SECRET)
        req.UserId = token_decode.id;
        return next();
    } catch (error) {
        console.log(error);
        return res.json({success : false, message : error})
    }
}

module.exports = {
    restrictToLoginUserOnly
}

