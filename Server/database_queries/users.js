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

async function storeSecret(username, secret) {
    const qry = `
    UPDATE users 
    SET c_secret_key_otp = $2
    WHERE c_tag = $1;`;

    try {
        // Set the search path before running query
        await setSchema();
        const rows = await pool.query(qry, [username, secret]);
        // Return Bool if update was successful or not
        return rows.rowCount > 0; // Returns true if at least one row was updated
    } catch (error) {
        console.error("Error storing secret key:", error);
        // Return false if an error occurs
        return false;
    }
}

async function getUsersSecret(username){
    const qry = `
    select users.c_secret_key_otp
    from users
    WHERE users.c_tag = $1;`;

    try {
        // Set the search path before running query
        await setSchema();
        // Run qry
        const {rows} = await pool.query(qry, [username]);
        // Return Rows
        return rows[0].c_secret_key_otp
    } catch (error) {
        console.error("Error validating credentials:", error);
        // Return false if an error occurs during validation
        return false;
    }
}

async function getUsersPosts(username){
    const qry = `select p.post_id, p.post_msg from posts p where p.c_tag = $1;`;

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

async function addPost(username, message){
    const qry = `insert into posts (c_tag, post_msg) values
                ($1, $2);`;

    try {
        // Set the search path before running query
        await setSchema();
        const response = (await pool.query(qry, [username, message]));
        return response
      }
    catch (error) {
        console.error("Error making post:", error);
    }
}
async function getAllPosts(){
    const qry = `select u.c_name, u.c_tag, p.post_msg from users u, posts p
                where u.c_tag = p.c_tag
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

async function getUsersName(username){
    const qry = `select users.c_name from users where users.c_tag=$1;`;

    try {
        // Set the search path before running query
        await setSchema();
        const { rows } = await pool.query(qry, [username]);
        // Extract the result from the query response
        const result = rows[0].c_name;
        return result;
    } catch (error) {
        console.error("Error validating credentials:", error);
        // Return false if an error occurs during validation
        return "";
    }
}
async function editPost(post_id, message) {
    const qry = `UPDATE posts SET post_msg = $2 WHERE post_id = $1;`;
  
    try {
      await setSchema();
      await pool.query(qry, [post_id, message]);
    } catch (error) {
      console.error("Error editing post:", error);
      return false
    }
    return true
  }

  async function deletePost(post_id) {
    const qry = `DELETE FROM posts WHERE post_id = $1;`;
  
    try {
      await setSchema();
      await pool.query(qry, [post_id]);
      return true; // Return true if deletion is successful
    } catch (error) {
      console.error("Error deleting post:", error);
      return false; // Return false if an error occurs during deletion
    }
  }

module.exports = {
    createUsers,
    storeSecret,
    getUsersSecret,
    getUsersPosts,
    addPost,
    getAllPosts,
    getUsersName,
    editPost,
    deletePost
}
