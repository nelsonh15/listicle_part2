import pool from '../config/database.js';

const getPlayers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM players ORDER BY id ASC');
        if (results) {
            res.status(200).json(results.rows)
        }
    }
    catch (error) {
        res.status(409).json ({ error: error.message })
    }
}

export default getPlayers;