const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const auth = require('./middleware/auth.cjs')
const cookieParser = require("cookie-parser");


const app = express()
app.use(express.json())
app.use(cookieParser())
const { client, pool } = require('./db/db.cjs')

const users = []

const JWT_SECRET = '1234'
const PORT = 3000

app.get('/', async function (req, res) {
  const results = await pool.query(`
    select * from users
  `)

  console.log(results.rows)
  return res.status(200).json({ message: 'Yayyy!!! So nice to see you again' })
})

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" })
  }

  const salt = crypto.randomUUID()
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  }
  console.log(typeof (hashedPassword))

  const query = await pool.query(`
    INSERT INTO users (name, email, password_hash)
    VALUES ('${name}', '${email}', '${hashedPassword}');
  `)

  return res.status(201).json({ message: "User registered successfully" })
})

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  const user = await pool.query(`
      SELECT id, name, email, password_hash FROM users
      WHERE email='${email}'
      LIMIT 1;
  `)

  if (user.rowCount == 0) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const foundUser = user.rows[0]
  const isMatch = await bcrypt.compare(password, foundUser.password_hash)

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: foundUser.id, name: foundUser.name, email: foundUser.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  )

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600000,
  });

  return res.status(200).json({ message: "Login successful", token, redirectTo: '/browse' })
})

app.get('/api/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Successfully logged out' })
});

app.get("/homepage", auth, (req, res) => {
  return res.status(200).json({
    message: "Welcome to homepage",
    user: req.user,
  })
})

app.get('/api/properties/list/:user_id', auth, async (req, res) => {
  const user_id = req.params.user_id

  const properties_list = await pool.query(`
    SELECT p.id, p.image_url, p.title, p.type, p.address, p.area_sqft, p.beds, p.baths from properties p
    LEFT JOIN favourites f on p.id = f.property_id AND f.user_id = $1
    WHERE f.property_id is null;
  `, [user_id])

  return res.status(200).json(properties_list.rows)
})

app.get('/api/properties/favourites/:user_id', auth, async (req, res) => {
  const user_id = req.params.user_id
  const properties_list = await pool.query(`
    SELECT p.id, p.image_url, p.title, p.type, p.address, p.area_sqft, p.beds, p.baths, f.id AS fav_id FROM properties p
    LEFT JOIN favourites f ON p.id = f.property_id
    WHERE f.user_id = ${user_id};
  `)

  return res.status(200).json(properties_list.rows)
})

app.get('/api/user/:user_id', auth, async (req, res) => {
  const user_id = req.params.user_id

  const userInfo = await pool.query(`
    SELECT * from users
    WHERE id = $1;
  `, [user_id])

  return res.status(200).json(userInfo.rows[0])
})

app.get('/api/favourite/add/:property_id/:user_id', auth, async (req, res) => {
  const {property_id, user_id} = req.params

  await pool.query(`
      INSERT INTO favourites (user_id, property_id)
      VALUES (${user_id}, ${property_id})
  `)

  return res.status(200).json({message: `Property ${property_id} added to favourite`})
})

app.delete('/api/favourites/remove/:user_id', auth, async (req, res) => {
  const fav_id = req.body.fav_id
  const user_id = req.params.user_id

  await pool.query(`
      DELETE FROM favourites
      WHERE id = $1;
  `, [fav_id])

  return res.status(200).json({message: 'Property deleted from favourite'})
})

app.get('/api/getUser', auth, (req, res) => {
  return res.json(req.user)
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))