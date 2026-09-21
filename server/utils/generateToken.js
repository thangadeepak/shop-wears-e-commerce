import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_ecom_key_2026_macha', {
    expiresIn: '30d',
  });
};

export default generateToken;
