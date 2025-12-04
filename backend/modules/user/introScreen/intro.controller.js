const Intro = require('./intro.model');

exports.addIntro = async (req, res, next) => {
    try {
        const { content } = req.body;

        if (!content || !Array.isArray(content)) {
            return res.status(400).json({ message: "content must be an array of strings" });
        }

        const intro = await Intro.create({ content });

        res.status(201).json({
            message: "Intro content added successfully",
            data: intro
        });

    } catch (err) {
        next(err);
    }
};

exports.getIntro = async (req, res, next) => {
    try {
        const intro = await Intro.findOne();

        if (!intro) {
            return res.status(404).json({ message: "Intro not found" });
        }

        res.status(200).json({
            content: intro.content
        });

    } catch (err) {
        next(err);
    }
};