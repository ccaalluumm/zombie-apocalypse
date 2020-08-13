import dbConnect from '../../../utils/dbConnect';
import Patient from '../../../models/Patient';

dbConnect();

export default async (req, res) => {
    const { method } = req;
    
    switch(method) {
        case 'GET':
            try {
                // Find all notes in the database
                const patients = await Patient.find({});

                res.status(200).json({ success: true, data: patients });
            } catch (error) {
                res.status(400).json({ success: false});
            }
            break;
        case 'POST':
            try {
                const patient = await Patient.create(req.body);

                res.status(201).json({ success: true, data: patient })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}