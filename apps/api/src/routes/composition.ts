import express = require("express");
import axios from "axios";

export const compositionRouter = express.Router();


compositionRouter.get("/:id", async (req, res) => {
    const id = req.params.id;

    await axios.get("http://localhost:8888/fhir/Composition?subject=Patient/" + id)
        .then((result) => res.send(JSON.stringify(result.data.entry)))
        .catch((error) => console.log(error))
});

