const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 2022;
app.use(express.static('dist'));
app.listen(port, () => console.log(`Server starting on port ${port}`));
