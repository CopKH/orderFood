import express from 'express'
import bodyParser from 'body-parser'
import { supabase } from './supabaseClient.js'

const app = express()
app.use(bodyParser.json())

const AUTH_TOKEN = 'my-secret-token'

app.post('/command', async (req, res) => {
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(403).json({ error: 'Unauthorized dddddddd' })
  }

  const { command, detail } = req.body

  const { error } = await supabase
    .from('commands')
    .insert([{ command, detail }])

  if (error) {
    console.error('❌ Error:', error)
    return res.status(500).json({ error: error.message })
  }

  console.log(`🔥 Received command: ${command} → ${detail}`)
  res.json({ status: 'saved to supabase' })
})

app.listen(3000, () => {
  console.log('🚀 Listening on Main')
})
