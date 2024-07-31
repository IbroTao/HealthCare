export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    res.status(statusCode).cookie(cookieName, token, {
        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }).json({
        success: true,
        message,
        user,
        token
    }) 
}