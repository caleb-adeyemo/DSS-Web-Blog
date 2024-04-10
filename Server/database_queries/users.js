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

async function createUsers(name, username, email, password, phone){
    const qry = `
    insert into users (c_name, c_tag, c_email, c_password, c_phoneno) values 
	($1, $2, $3, $4, $5);`;

    try {
        // Set the search path before running query
        await setSchema();
        const rows = await pool.query(qry, [name, username, email, password, phone]);
        // Return Bool if insert was successfull or not
        if(rows.command === 'INSERT'){
            return true;
        }else{
            return false
        }
    } catch (error) {
        console.error("Error validating credentials:", error);
        // Return false if an error occurs during validation
        return false;
    }
}

async function getUsersPosts(username){
    const qry = `select p.post_msg from posts p where p.c_tag = $1;`;

    try {
        // Set the search path before running query
        await setSchema();
        // Run qry
        const rows = await pool.query(qry, [username]);
        // Return Rows
        return rows
    } catch (error) {
        console.error("Error validating credentials:", error);
        // Return false if an error occurs during validation
        return false;
    }
}

async function addPost(message){
    const qry = `insert into posts (c_no, post_msg) values
                (5, '${message}');`;

    try {
        // Set the search path before running query
        await setSchema();
        const response = (await pool.query(qry));
        return response
      }
    catch (error) {
        console.error("Error making post:", error);
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
    createUsers,
    getUsersPosts,
    addPost,
    getAllPosts
}
