const poolConfig = require("../config");
const { Pool } = require("pg");
const pool = new Pool(poolConfig);

// Set search path
async function setSchema() {
    try {
        await pool.query("SET search_path TO 'DSS Blog', public;");
    } 
    catch (error) {
        console.error("Error setting search path:", error);
    }
}

async function getAllPosts(){
    const qry = `select u.c_name, u.c_tag, p.post_msg from users u, posts p
                where u.c_no = p.c_no
                order by p.post_time asc`;

    try {
        // Set the search path before running query
        await setSchema();
        const response = (await pool.query(qry));
        return response
      }
    catch (error) {
        console.error("Error getting posts:", error);
    }
}

module.exports = {
    getAllPosts
}