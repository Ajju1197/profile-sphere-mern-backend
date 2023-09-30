import PersonalDataModel from '../model/aboutSchema.js';

export const getAboutUserDetails = async (req, res) => {
    try {
        const data = await PersonalDataModel.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateAboutUserDetails = async (req, res) => {
    try {
        const updatedData = await PersonalDataModel.findByIdAndUpdate(req.params.id, {$set: {...req.body}}, {new : true});
        res.json(updatedData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

