import express = require("express");
import axios from "axios";

export const taskRouter = express.Router();
const requestUrl = "http://localhost:8888/fhir/Task";

taskRouter.get("", async (req, res) => {
    await axios
        .get(requestUrl, { params: req.query })
        .then((response) => {
            res.send(JSON.stringify(response.data.entry));
        })
        .catch((error) => {
            res.send(error);
        });
});
