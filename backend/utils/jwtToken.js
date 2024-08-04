// import jwt from 'jsonwebtoken';

// export const generateToken = (user, message, statusCode, res) => {
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
//         expiresIn: process.env.JWT_EXPIRES,
//     });

//     const options = {
//         expires: new Date(
//             Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true,
//     };

//     res.status(statusCode).cookie('token', token, options).json({
//         success: true,
//         message,
//         user,
//     });
// };

// export default generateToken;


export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    res.status(statusCode).cookie(cookieName, token, {
        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
    }).json({
        success: true,
        message,
        user,
        token
    }) 
}