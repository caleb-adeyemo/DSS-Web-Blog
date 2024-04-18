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


async function getPostsWithWord(word){
    const qry = `select u.c_name, u.c_tag, p.post_msg from users u, posts p WHERE u.c_tag = p.c_tag and 
                p.post_msg LIKE $1;`;

    try {
        // Set the search path before running query
        await setSchema();
        // Run qry
        const rows = await pool.query(qry, [`%${word}%`]);
        // Return Rows
        return rows.rows
    } catch (error) {
        console.error("Error retriving posts:", error);
        // Return false if an error occurs during validation
        return false;
    }
}

module.exports = {
    getPostsWithWord
}
