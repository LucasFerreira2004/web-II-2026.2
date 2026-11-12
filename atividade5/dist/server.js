"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = Number(process.env.PORT) || 3000;
const isPrismaNotFoundError = (error) => {
    return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025';
};
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({ message: 'API Person is running.' });
});
app.get('/people', async (_req, res) => {
    try {
        const people = await prisma.person.findMany({
            orderBy: { id: 'asc' },
        });
        res.json(people);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar pessoas.' });
    }
});
app.get('/people/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'ID inválido.' });
    }
    try {
        const person = await prisma.person.findUnique({ where: { id } });
        if (!person) {
            return res.status(404).json({ error: 'Pessoa não encontrada.' });
        }
        return res.json(person);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar pessoa.' });
    }
});
app.post('/people', async (req, res) => {
    const { name, height, weight } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: 'O campo name é obrigatório.' });
    }
    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);
    if (!Number.isFinite(parsedHeight) || !Number.isFinite(parsedWeight)) {
        return res.status(400).json({ error: 'Os campos height e weight devem ser numéricos.' });
    }
    try {
        const person = await prisma.person.create({
            data: {
                name: name.trim(),
                height: Math.round(parsedHeight),
                weight: parsedWeight,
            },
        });
        return res.status(201).json(person);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao cadastrar pessoa.' });
    }
});
app.put('/people/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name, height, weight } = req.body;
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'ID inválido.' });
    }
    const data = {};
    if (name !== undefined) {
        if (typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({ error: 'O campo name deve ser uma string válida.' });
        }
        data.name = name.trim();
    }
    if (height !== undefined) {
        const parsedHeight = Number(height);
        if (!Number.isFinite(parsedHeight)) {
            return res.status(400).json({ error: 'O campo height deve ser numérico.' });
        }
        data.height = Math.round(parsedHeight);
    }
    if (weight !== undefined) {
        const parsedWeight = Number(weight);
        if (!Number.isFinite(parsedWeight)) {
            return res.status(400).json({ error: 'O campo weight deve ser numérico.' });
        }
        data.weight = parsedWeight;
    }
    if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Informe pelo menos um campo para atualizar.' });
    }
    try {
        const person = await prisma.person.update({
            where: { id },
            data,
        });
        return res.json(person);
    }
    catch (error) {
        if (isPrismaNotFoundError(error)) {
            return res.status(404).json({ error: 'Pessoa não encontrada.' });
        }
        return res.status(500).json({ error: 'Erro ao atualizar pessoa.' });
    }
});
app.delete('/people/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'ID inválido.' });
    }
    try {
        await prisma.person.delete({ where: { id } });
        return res.status(204).send();
    }
    catch (error) {
        if (isPrismaNotFoundError(error)) {
            return res.status(404).json({ error: 'Pessoa não encontrada.' });
        }
        return res.status(500).json({ error: 'Erro ao remover pessoa.' });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
