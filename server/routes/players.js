import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import getPlayers from '../controllers/players.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()
router.get('/', getPlayers)

router.get('/:playerId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/players.html'))
})


export default router
