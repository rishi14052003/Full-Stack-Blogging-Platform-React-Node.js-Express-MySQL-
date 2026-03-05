const { pool } = require('../config/db');

class Post {
  static async create(postData) {
    const { title, content, excerpt, featured_image, author_id, status = 'draft', scheduled_at } = postData;
    
    const query = `
      INSERT INTO posts (title, content, excerpt, featured_image, author_id, status, scheduled_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
      const [result] = await pool.execute(query, [title, content, excerpt, featured_image, author_id, status, scheduled_at]);
      return await this.findById(result.insertId);
    } catch (error) {
      throw error;
    }
  }
  
  static async findById(id) {
    const query = `
      SELECT p.*, u.username as author_name, u.avatar as author_avatar
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }
  
  static async findAll(options = {}) {
    const { status = 'published', limit = 10, offset = 0, author_id } = options;
    
    let query = `
      SELECT p.*, u.username as author_name, u.avatar as author_avatar
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.status = ?
    `;
    const params = [status];
    
    if (author_id) {
      query += ' AND p.author_id = ?';
      params.push(author_id);
    }
    
    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const [rows] = await pool.execute(query, params);
    return rows;
  }
  
  static async update(id, updateData) {
    const { title, content, excerpt, featured_image, status } = updateData;
    
    const query = `
      UPDATE posts 
      SET title = ?, content = ?, excerpt = ?, featured_image = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const [result] = await pool.execute(query, [title, content, excerpt, featured_image, status, id]);
    return result.affectedRows > 0;
  }
  
  static async delete(id) {
    const query = 'DELETE FROM posts WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }
  
  static async count(options = {}) {
    const { status = 'published', author_id } = options;
    
    let query = 'SELECT COUNT(*) as total FROM posts WHERE status = ?';
    const params = [status];
    
    if (author_id) {
      query += ' AND author_id = ?';
      params.push(author_id);
    }
    
    const [rows] = await pool.execute(query, params);
    return rows[0].total;
  }
}

module.exports = Post;