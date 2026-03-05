const { pool } = require('../config/db');

class Like {
  static async create(likeData) {
    const { post_id, user_id } = likeData;
    
    const query = `
      INSERT INTO likes (post_id, user_id)
      VALUES (?, ?)
    `;
    
    try {
      const [result] = await pool.execute(query, [post_id, user_id]);
      return await this.findById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('User already liked this post');
      }
      throw error;
    }
  }
  
  static async findById(id) {
    const query = 'SELECT * FROM likes WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }
  
  static async findByPostAndUser(postId, userId) {
    const query = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';
    const [rows] = await pool.execute(query, [postId, userId]);
    return rows[0];
  }
  
  static async delete(postId, userId) {
    const query = 'DELETE FROM likes WHERE post_id = ? AND user_id = ?';
    const [result] = await pool.execute(query, [postId, userId]);
    return result.affectedRows > 0;
  }
  
  static async countByPostId(postId) {
    const query = 'SELECT COUNT(*) as total FROM likes WHERE post_id = ?';
    const [rows] = await pool.execute(query, [postId]);
    return rows[0].total;
  }
  
  static async findByPostId(postId, options = {}) {
    const { limit = 20, offset = 0 } = options;
    
    const query = `
      SELECT l.*, u.username as user_name, u.avatar as user_avatar
      FROM likes l
      JOIN users u ON l.user_id = u.id
      WHERE l.post_id = ?
      ORDER BY l.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const [rows] = await pool.execute(query, [postId, limit, offset]);
    return rows;
  }
  
  static async findByUserId(userId, options = {}) {
    const { limit = 20, offset = 0 } = options;
    
    const query = `
      SELECT l.*, p.title as post_title, u.username as author_name
      FROM likes l
      JOIN posts p ON l.post_id = p.id
      JOIN users u ON p.author_id = u.id
      WHERE l.user_id = ?
      ORDER BY l.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const [rows] = await pool.execute(query, [userId, limit, offset]);
    return rows;
  }
  
  static async toggleLike(postId, userId) {
    const existingLike = await this.findByPostAndUser(postId, userId);
    
    if (existingLike) {
      await this.delete(postId, userId);
      return { liked: false, message: 'Post unliked' };
    } else {
      await this.create({ post_id: postId, user_id: userId });
      return { liked: true, message: 'Post liked' };
    }
  }
}

module.exports = Like;