"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const habitRoutes_1 = __importDefault(require("./routes/habitRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const quoteRoutes_1 = __importDefault(require("./routes/quoteRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/habits', habitRoutes_1.default);
app.use('/api/logs', logRoutes_1.default);
app.use('/api/quotes', quoteRoutes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Habit Tracker API is running' });
});
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
