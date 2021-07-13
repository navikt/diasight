import express = require("express");
import axios from "axios";

export const conditionRouter = express.Router();


conditionRouter.get("/:id", async (req, res) => {
    const id = req.params.id;

    await axios.get("http://localhost:8888/fhir/Condition/" + id)
        .then((result) => res.send(JSON.stringify(result.data)))
        .catch((error) => console.log(error))
});

