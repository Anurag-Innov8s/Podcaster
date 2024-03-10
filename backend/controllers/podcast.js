const Podcasts = require("../models/Podcasts");
const Episodes = require("../models/Episodes");
const User = require("../models/User");

exports.createPodcast = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        console.log(user);
        let episodeList = [];
        await Promise.all(req.body.episodes.map(async (item)=>{
            const episode = new Episodes({
                creator:user.id,...item
            })
            const savedEpisode = await episode.save();
            episodeList.push(savedEpisode._id)
        }))

        const podcast = new Podcasts({
            creator:user.id,
            episodes:episodeList,
            name:req.body.name,
            description:req.body.description,
            thumbnail:req.body.thumbnail,
            tags:req.body.tags,
            type: req.body.type,
            category:req.body.category
        })
        const savedPodcast = await podcast.save();

        await User.findByIdAndUpdate(user.id,{
            $push:{podcasts:savedPodcast.id},
        },
            {
                new:true
            }
        )
        res.status(201).json({
            sucess:true,
            savedPodcast,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}