const { pool } = require('../config/db');

class Comment {
  static async create(commentData) {
    const { content, post_id, author_id, parent_id = null } = commentData;
    
    const query = `
      INSERT INTO comments (content, post_id, author_id, parent_id)
      VALUES (?, ?, ?, ?)
    `;
    
    try {
      const [result] = await pool.execute(query, [content, post_id, author_id, parent_id]);
      return await this.findById(result.insertId);
    } catch (error) {
      throw error;
    }
  }
  
  static async findById(id) {
    const query = `
      SELECT c.*, u.username as author_name, u.avatar as author_avatar
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }
  
  static async findByPostId(postId, options = {}) {
    const { limit = 50, offset = 0 } = options;
    
    const query = `
      SELECT c.*, u.username as author_name, u.avatar as author_avatar
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
      LIMIT ? OFFSET ?
    `;
    
    const [rows] = await pool.execute(query, [postId, limit, offset]);
    return rows;
  }
  
  static async findByUserId(userId, options = {}) {
    const { limit = 20, offset = 0 } = options;
    
    const query = `
      SELECT c.*, p.title as post_title, u.username as author_name, u.avatar as author_avatar
      FROM comments c
      JOIN posts p ON c.post_id = p.id
      JOIN users u ON c.author_id = u.id
      WHERE c.author_id = ?
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const [rows] = await pool.execute(query, [userId, limit, offset]);
    return rows;
  }
  
  static async update(id, updateData) {
    const { content } = updateData;
    
    const query = `
      UPDATE comments 
      SET content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const [result] = await pool.execute(query, [content, id]);
    return result.affectedRows > 0;
  }
  
  static async delete(id) {
    const query = 'DELETE FROM comments WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }
  
  static async countByPostId(postId) {
    const query = 'SELECT COUNT(*) as total FROM comments WHERE post_id = ?';
    const [rows] = await pool.execute(query, [postId]);
    return rows[0].total;
  }
  
  static async getReplies(parentId, options = {}) {
    const { limit = 20, offset = 0 } = options;
    
    const query = `
      SELECT c.*, u.username as author_name, u.avatar as author_avatar
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.parent_id = ?
      ORDER BY c.created_at ASC
      LIMIT ? OFFSET ?
    `;
    
    const [rows] = await pool.execute(query, [parentId, limit, offset]);
    return rows;
  }
}

module.exports = Comment;