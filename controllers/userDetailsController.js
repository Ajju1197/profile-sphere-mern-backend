import User from '../model/userSchema.js';
import Video from '../model/Video.js';

// Getting the all signup users data here.
export const getAllUserData = async (req, res, next) => {
    try {
        const { q } = req.query;
        const regex = new RegExp(`${q}`, "i");

        const allSignupUsersData = await User.find({
            $or: [ {name: regex},{email: regex}],
        });

        const sortUserData = allSignupUsersData.reverse();
        
        res.status(200).json(sortUserData);
    } catch (error) {
        next(error)
    }
}

// Getting the single signup user data here.
export const getUserData = async (req, res) => {
    try {
        const signupUserData = await User.findById(req.params.id);
        res.json(signupUserData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' })
    }
}

// Updating the single signup user data here.
export const updateUserData = async (req, res, next) => {
    console.log('This is user', req.user);
    // console.log(req.params);
    const { id } = req.params;

    try {
        // Check if the requested ID matches the logged-in user's ID
        if (id !== req.user._id) {
            return res.status(403).json({ error: "You can update only your account!" });
        }

        // Extract profileImage and other fields from the request body
        const { ...updateFields } = req.body;

        // If profileImage is provided, add it to the updateFields object
        if (req.file) {
            updateFields.profileImage = req.file.filename; //    Assuming you store the filename
        }

        // Update the user data in the database
        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }
};


// Deleting the single signup user data here.
export const deleteUserData = async (req, res, next) => {
    if (req.params.id == req.user._id) {
        try {
            const userData = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error.' })
        }
    } else {
        return res.status(403).json({ error: "You can delete only your account!" });
    }
}

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $push: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription successfull.")
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { subscribedUsers: req.params.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 },
            });
            res.status(200).json("Unsubscription successfull.")
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

export const like = async (req, res, next) => {
    const id = req.user._id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })
        res.status(200).json("The video has been liked.")
    } catch (err) {
        next(err);
    }
};

export const dislike = async (req, res, next) => {
    const id = req.user._id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })
        res.status(200).json("The video has been disliked.")
    } catch (err) {
        next(err);
    }
};

