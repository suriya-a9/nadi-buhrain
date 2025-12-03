const Intro = require('./intro.model');

exports.addIntro = async(req, res,next)=>{
    const {content} = req.body;
    try{
        const createContent = await Intro.create({req.body});
        res.status()
    }catch(err){
        next(err);
    }
}