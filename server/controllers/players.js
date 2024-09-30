import pool from '../config/database.js';

const getPlayers = async (req, res) => {
    const { filter, query } = req.query; // Get the filter and query from the request

    try {
        let results;

        if (filter && query) {
            // Build the SQL query based on the filter type
            let sqlQuery;
            switch (filter) {
                case 'name':
                    sqlQuery = `SELECT * FROM players WHERE LOWER(name) LIKE LOWER($1) ORDER BY id ASC`;
                    break;
                case 'position':
                    sqlQuery = `SELECT * FROM players WHERE LOWER(position) LIKE LOWER($1) ORDER BY id ASC`;
                    break;
                case 'team':
                    sqlQuery = `SELECT * FROM players WHERE LOWER(team) LIKE LOWER($1) ORDER BY id ASC`;
                    break;
                default:
                    sqlQuery = `SELECT * FROM players ORDER BY id ASC`; // Default query
                    break;
            }

            results = await pool.query(sqlQuery, [`%${query}%`]); // Parameterized query
        } else {
            // If no filter, return all players
            results = await pool.query('SELECT * FROM players ORDER BY id ASC');
        }

        if (results.rows.length > 0) {
            res.status(200).json(results.rows);
        } else {
            res.status(404).json({ message: 'No players found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getPlayers;
