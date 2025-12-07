
import { mysqlPool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
         const { name, email, password, role } = req.body;
         const hash = await bcrypt.hash(password, 10);
         try {
                  const [result] = await mysqlPool.execute(
                           'INSERT INTO users (name, email, passwordHash, role) VALUES (?, ?, ?, ?)',
                           [name, email, hash, role || 'customer']
                  );
                  res.status(201).json({ message: 'User created' });
         } catch (err) {
                  res.status(500).json({ error: err.message });
         }
};

export const login = async (req, res) => {
         const { email, password } = req.body;
         const [users] = await mysqlPool.execute('SELECT * FROM users WHERE email = ?', [email]);
         if (users.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
         const user = users[0];
         const isMatch = await bcrypt.compare(password, user.passwordHash);
         if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
         const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
         res.json({ token, user: { name: user.name, role: user.role } });
};