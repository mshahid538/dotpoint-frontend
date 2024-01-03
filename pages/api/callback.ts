import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Handle Line callback here, if needed
    // This can include additional logic or redirecting to a specific page
    const additionalData:any = {
        message: 'Line login successful!',
        code: req.query.code, // You can include Line callback data if needed
    };

    const queryParams = new URLSearchParams(additionalData).toString();
    res.redirect(`/api/login?${queryParams}`);
};
