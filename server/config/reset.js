import pool from './database.js';
import playersData from '../data/players.js';

const createPlayersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS players;

        CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            team VARCHAR(255) NOT NULL,
            position VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );
    `
    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 Players table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating table:', err);
    }
};

const seedPlayersTable = async () => {
    await createPlayersTable();

    const insertPromises = playersData.map(player => {
        const insertQuery = {
            text: 'INSERT INTO players (name, team, position, image, description) VALUES ($1, $2, $3, $4, $5)',
            values: [
                player.name,
                player.team,
                player.position,
                player.image,
                player.description
            ]
        };
        return pool.query(insertQuery);
    });

    try {
        await Promise.all(insertPromises);
        console.log('✅ All players added successfully');
    } catch (err) {
        console.error('⚠️ error inserting players:', err);
    }
};

seedPlayersTable();
