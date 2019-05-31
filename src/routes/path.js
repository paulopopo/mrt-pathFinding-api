let express = require("express");
let router = express.Router();
const travelItenary = require("../service/path/index");

//no time considaration
router.get("/", async (req, res, next) => {
    let start = req.query.start;
    let end = req.query.end;
    let startAt = req.query.startAt ? req.query.startAt : false;
    let result = await travelItenary(start.toUpperCase(), end.toUpperCase(), startAt);
    if (result.error) {
        res.status(500).send(result.error);
    }
    res.send(result);
});

//speficic date
router.get("/now", async (req, res, next) => {
    let start = req.query.start;
    let end = req.query.end;
    let startAt = new Date();
    let result = await travelItenary(start.toUpperCase(), end.toUpperCase(), startAt);
    if (result.error) {
        res.status(500).send(result.error);
    }
    res.send(result);
});

router.get("/nightTime", async (req, res, next) => {
    let start = req.query.start;
    let end = req.query.end;
    let result = await travelItenary(start.toUpperCase(), end.toUpperCase(), false, "nightTime");
    if (result.error) {
        res.status(500).send(result.error);
    }
    res.send(result);
});

router.get("/peakHour", async (req, res, next) => {
    let start = req.query.start;
    let end = req.query.end;
    let result = await travelItenary(start.toUpperCase(), end.toUpperCase(), false, "peakHour");
    if (result.error) {
        res.status(500).send(result.error);
    }
    res.send(result);
});

router.get("/nonPeakHour", async (req, res, next) => {
    let start = req.query.start;
    let end = req.query.end;
    let result = await travelItenary(start.toUpperCase(), end.toUpperCase(), false, "nonPeakHour");
    if (result.error) {
        res.status(500).send(result.error);
    }
    res.send(result);
});

module.exports = router;
