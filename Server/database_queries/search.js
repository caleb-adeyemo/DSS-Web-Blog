const poolConfig = require("../config");
const { Pool } = require("pg");
const pool = new Pool(poolConfig);

// Set search path
async function setSchema() {
    try {
        await pool.query("SET search_path TO 'DSS Blog', public;");
    } catch (error) {
        console.error("Error setting search path:", error);
    }
}


async function getPostsWithWord(word) {
    const qry = `SELECT u.c_name, u.c_tag, p.post_id, p.post_msg FROM users u, posts p 
                 WHERE u.c_tag = p.c_tag AND p.post_msg ILIKE $1;`;
  
    try {
      // Set the search path before running query
      await setSchema();
      // Run query
      const rows = await pool.query(qry, [`%${word}%`]);
      // Return Rows
      return rows.rows;
    } catch (error) {
      console.error("Error retrieving posts:", error);
      // Return false if an error occurs during retrieval
      return false;
    }
  }

module.exports = {
    getPostsWithWord
}
