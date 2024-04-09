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
module.exports = {
    createUsers
}
