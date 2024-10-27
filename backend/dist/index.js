import express from 'express';
const app = express();
app.use(express.json());
app.post('/users/:id', (req, res) => {
    console.log(req.params.id);
    res.json({ "id": req.params.id, "name": req.body.name });
});
app.get('/', (req, res) => {
    res.send('hello world');
    console.log(req.body);
});
app.listen(3000, () => console.log("Server started"));
//# sourceMappingURL=index.js.map