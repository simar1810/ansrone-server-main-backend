const DemoVideo = require("../Models/demoVideo");

const add = async (req, res) => {
    const { url } = req.body;

    try {
        const demoVideo = await DemoVideo.findOne({
           url, 
        });

        if (demoVideo) {
            return res.json({
                success: false,
                message: "url already exists",
            });
        } else {
            const demoVideo = await DemoVideo.create({
                url,
            });

            return res.json({
                success: true,
                message: "Demo video added",
                _id: demoVideo._id,
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const get = async (req, res) => {
    DemoVideo.find()
    .then(result=>{
        res.status(200).json({
            video:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
};



module.exports = {
    add,
    get,
};