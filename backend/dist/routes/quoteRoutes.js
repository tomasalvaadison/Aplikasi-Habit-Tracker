"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quoteController_1 = require("../controllers/quoteController");
const router = (0, express_1.Router)();
router.get('/random', quoteController_1.getRandomQuote);
router.post('/seed', quoteController_1.seedQuotes);
exports.default = router;
