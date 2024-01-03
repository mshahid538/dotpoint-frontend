import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const redirectUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2000975203&redirect_uri=https://main.d3ijzon4ntrxm0.amplifyapp.com/api/callback&state=state&scope=openid%20profile`;

    res.redirect(redirectUrl);
};
