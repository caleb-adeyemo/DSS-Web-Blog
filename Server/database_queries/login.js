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

async function validate(username, password){
    const qry = `
                SELECT 
                CASE 
                    WHEN EXISTS (SELECT 1 FROM users WHERE c_tag = $1 AND c_phoneno = $2) THEN 'true'
                    ELSE 'false'
                END 
                AS result;`;

    try {
        // Set the search path before running query
        await setSchema();
        const { rows } = await pool.query(qry, [username, password]);
        // Extract the result from the query response
        const isValid = rows[0].result === 'true'; // Assuming the result is either 'true' or 'false'
        return isValid;
    } catch (error) {
        console.error("Error validating credentials:", error);
        // Return false if an error occurs during validation
        return false;
    }
}

async function getUsersPassword(username){
    const qry = `select users.c_password from users where users.c_tag=$1;`;

    try {
        // Set the search path before running query
        await setSchema();
        const { rows } = await pool.query(qry, [username]);
        // Extract the result from the query response
        const result = rows[0].c_password
        return result;
    } catch (error) {
        console.error("Error validating credentials:", error);
        // Return false if an error occurs during validation
        return "";
    }
}

module.exports = {
    validate,
    getUsersPassword,
}
