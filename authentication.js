const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        },
    }),
);

const users = [];

// Password validation
function validatePassword(password) {
    const errors = [];

    if (password.length < 8) errors.push("MIN 8 CHARACTERS REQUIRED");
    if (!/[A-Z]/.test(password)) errors.push("1 UPPERCASE required");
    if (!/[0-9]/.test(password)) errors.push("1 number required");
    if (!/[@#$%!^&*]/.test(password)) errors.push("1 special char required");
    return {
        isValid: errors.length === 0,
        errors,
    };
}

// Auth middleware
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).json({ msg: "Login Required" });
}

function requireRole(role) {
    return (req, res, next) => {
        const user = users.find(u => u.id === req.session.userId);
        if (!user || user.role !== role) {
            return res.status(403).json({ msg: "Access Denied" });
        }
        next();
    };
}

// Register route
app.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "all fields are required" });
        }
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            return res.status(409).json({ msg: "user already exists" });
        }
        const validation = validatePassword(password);
        if (!validation.isValid) {
            return res.status(400).json({ errors: validation.errors });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        };
        users.push(newUser);
        res.status(201).json({
            msg: "user Registered",
            user: {
                id: newUser.id,
                username,
                email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password required" });
        }
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        req.session.userId = user.id;
        res.json({
            msg: "Logged in",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Logout route
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ msg: "Logout failed" });
        }
        res.json({ msg: "Logged out" });
    });
});

// Protected route example
app.get("/profile", isAuthenticated, (req, res) => {
    const user = users.find(u => u.id === req.session.userId);
    res.json({ user });
});

app.get("/admin", isAuthenticated, requireRole("admin"), (req, res) => {
    res.json({ msg: "Admin access granted" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Auth server running on http://localhost:${PORT}`);
});

module.exports = app;

