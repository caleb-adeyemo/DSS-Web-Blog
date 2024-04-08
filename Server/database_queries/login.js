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

async function validate(userName, password){
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
        const { rows } = await pool.query(qry, [userName, password]);
        // Extract the result from the query response
        const isValid = rows[0].result === 'true'; // Assuming the result is either 'true' or 'false'
        return isValid;
    } catch (error) {
        console.error("Error validating credentials:", error);
        // Return false if an error occurs during validation
        return false;
    }
}

module.exports = {
    validate
}
