import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import config from '../config';

// Define a more specific type for the JWT payload
interface CustomJWTPayload extends JwtPayload {
  id: string;
  role: 'admin' | 'user' | 'superAdmin'; // Use your defined Role type/enum
}

const auth = (allowedRoles: ('admin' | 'user' | 'superAdmin')[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwt_secret as string) as CustomJWTPayload;

      // Check if the role in the token is allowed
      if (!allowedRoles.includes(decoded?.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden: You do not have permission to access this resource' });
      }

      // Attach decoded user info to the request
      req.user = decoded; // req.user should be typed via declaration merging
      next();
    } catch (err) {
      // Handle specific JWT errors if needed (e.g., TokenExpiredError)
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Token expired' });
      }
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
      }
      // Generic error
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
  };
};

export default auth;
