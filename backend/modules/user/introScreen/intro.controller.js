const Intro = require('./intro.model');

exports.addIntro = async(req, res,next)=>{
    const {content} = req.body;
    try{
    }catch(err){
        next(err);
    }
}