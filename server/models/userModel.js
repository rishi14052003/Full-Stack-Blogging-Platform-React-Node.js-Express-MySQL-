const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { username, email, password, avatar = '', bio = '' } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const query = `
      INSERT INTO users (username, email, password, avatar, bio)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    try {
      const [result] = await pool.execute(query, [username, email, hashedPassword, avatar, bio]);
      return await this.findById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('User already exists');
      }
      throw error;
    }
  }
  
  static async findById(id) {
    const query = 'SELECT id, username, email, avatar, bio, is_admin, created_at, updated_at FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }
  
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
  }
  
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows[0];
  }
  
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;