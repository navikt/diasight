const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 2022;
const index = (req, res) => res.sendFile(require('path').join(__dirname, 'dist/index.html'))
app.use(express.static('dist'));
app.get("/oversikt", index);
app.get("/pasient", index);
app.get("/pasient/:id", index);
app.get("/timeplan", index);
app.get("/inbox", index);
app.get("/instillinger", index);
app.listen(port, () => console.log(`Server starting on port ${port}`));
