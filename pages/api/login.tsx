import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { code }: any = req.query;

    try {
        const response = await axios.post(
            'https://api.line.me/oauth2/v2.1/token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code as string,
                redirect_uri: "https://main.d3ijzon4ntrxm0.amplifyapp.com/api/callback",
                client_id: "2000975203",
                client_secret: "12094a5dcdb53b512dfd6b2dab369489",
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { id_token } = response.data;
        res.redirect(`/?code=${id_token}`);
    } catch (error: any) {
        console.error('Line Login Error:', error.response?.data || error.message);
        res.status(500).end('Internal Server Error');
    }
};
