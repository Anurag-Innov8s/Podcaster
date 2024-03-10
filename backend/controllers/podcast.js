const Podcasts = require("../models/Podcasts");
const Episodes = require("../models/Episodes");
const User = require("../models/User");
const { Promise } = require("mongoose");

exports.createPodcast = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        // console.log(user);
        let episodeList = [];
        // await Promise.all(req.body.episodes.map(async (item)=>{
        //     const episode = new Episodes({
        //         creator:user.id,...item
        //     })
        //     const savedEpisode = await episode.save();
        //     episodeList.push(savedEpisode._id)
        // }))

        const podcast = new Podcasts({
            creator: user.id,
            episodes: episodeList,
            name: req.body.name,
            description: req.body.description,
            thumbnail: req.body.thumbnail,
            tags: req.body.tags,
            type: req.body.type,
            category: req.body.category
        })
        const savedPodcast = await podcast.save();

        await User.findByIdAndUpdate(user.id, {
            $push: { podcasts: savedPodcast.id },
        },
            {
                new: true
            }
        )
        res.status(201).json({
            sucess: true,
            savedPodcast,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// exports.addEpisodes = async(req,res)=>{
//     try {
//         console.log("a");
//     } catch (error) {
//         res.json(error)
//     }
// }

exports.getPodcasts = async (req, res) => {
    try {
        const podcast = await Podcasts.find().populate("creator", "name img")
        if (podcast) {
            return res.status(200).json({
                success: true,
                message: "Podcast Found",
                podcast
            })
        }
        else {
            return res.status(404).json({
                success: true,
                message: "Podcast not Found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getPodcastsById = async (req, res) => {
    try {
        const podcast = await Podcasts.findById(req.params.id).populate("creator", "name img");
        return res.status(200).json({
            success: true,
            podcast
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

exports.favouritePodcast = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const podcast = await Podcasts.findById(req.body.id)
        let found = false;


        // if (user.id === podcast.creator) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "You can't favourite your own podcasts"
        //     })
        // }




        // check for already in favourites
        await (user.favourites.map(async (item) => {
            if (req.body.id == item) {
                found = true;
                await User.findByIdAndUpdate(user.id, {
                    $pull: { favourites: req.body.id }
                },
                    {
                        new: true
                    }
                )
                return res.status(200).json({
                    success: true,
                    message: "Removed from favourites"
                })
            }
        }))
        if (!found) {
            await User.findByIdAndUpdate(user.id, {
                $push: { favourites: req.body.id }
            },
                {
                    new: true
                }
            )
            res.status(200).json({
                success: true,
                message: "Added to favourite"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.addView = async (req, res) => {
    try {
        await Podcasts.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        res.status(200).json({
            success: true,
            message: "Podcast Viewed"
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}

exports.random = async (req, res) => {
    try {
        const podcasts = await Podcasts.aggregate([{ $sample: { size: 40 } }])
            .exec();  // Execute the aggregation

        // Populate the fields
        await Podcasts.populate(podcasts, {
            path: "creator",
            select: "name img"
        });
        await Podcasts.populate(podcasts, {
            path: "episodes"
        });

        res.status(200).json({
            success: true,
            podcasts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.mostPopular = async (req, res) => {
    try {
        const podcasts = await Podcasts.find().sort({ views: -1 }).populate("creator", "name img").populate("episodes")
        res.status(200).json({
            success: true,
            podcasts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// exports.getByTag = async(req,res)=>{
//     const tags = req.query.tags.split(",")
//     try {
//         const podcasts = await Podcasts.find({tags:{$in:tags}}).populate("creator","name img").populate("episodes")
//         res.status(200).json({
//             success:true,
//             podcasts
//         })
//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

exports.getByCategory = async(req,res)=>{
    const query = req.query.q;
    try {
        const podcast = await Podcasts.find({ 

            category: { $regex: query, $options: "i" },
            }).populate("creator", "name img").populate("episodes");
        res.status(200).json({
            success:true,
            podcast
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.search = async (req, res) => {
    const query = req.query.q;

    try {
        const podcast = await Podcasts.find({
            name: { $regex: query, $options: "i" },
        }).populate("creator", "name img").populate("episodes").limit(40);
        res.status(200).json({
            success: true,
            podcast
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}