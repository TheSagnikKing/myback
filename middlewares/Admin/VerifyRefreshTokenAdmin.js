const jwt = require('jsonwebtoken')

const JWT_ACCESS_SECRET = "accessTokenAdmin"
// const JWT_REFRESH_SECRET = "refreshToken"

const verifyRefreshTokenAdmin = (req, res, next) => {

    // // accessToken aschena atar dutoi way ache either user page refresh koreche tai access token uregech or
    // // refresh token expire kore geche tai access token generate hochena
    try {
        const admincookie = req.cookies

        console.log(admincookie)

        if (!admincookie?.AdminToken) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized Admin"
            })
        }

        jwt.verify(
            admincookie?.AdminToken,
            JWT_ACCESS_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({success: false, message: 'Forbidden Admin' })

                req.email = decoded.email
                req.role = decoded.role
                next()
            }
        )
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = verifyRefreshTokenAdmin 