import jwt from 'jsonwebtoken'
import config from '../config';

const generateToken = (user:any) => {
    return jwt.sign(
        { email: user.email, role: user.role }, config.jwt_secret as string,
        { expiresIn: '1d' }
    );
};

export default generateToken;
