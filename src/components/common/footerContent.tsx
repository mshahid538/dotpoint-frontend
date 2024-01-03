import React from 'react'
import { Grid } from '@mui/material'
import TextLabel from './commonTextLabel';

const FooterContent = () => {
    return (
        <>
            <Grid spacing={2} item>
                <Grid xs={12} textAlign={"center"} marginTop={4}>
                    <TextLabel variant={"body1"} lineHeight={{sm: "23px", xs: "19px"}} textAlign="center" title={"The content provided on this website is strictly for educational purposes pertaining to trading on financial markets and should not be construed as a precise investment suggestion, business advice, investment opportunity evaluation, or an analogous general recommendation for trading investment instruments. Dot Point exclusively offers simulated trading services and educational resources for traders. The information provided on this website is not intended for individuals residing in any country or jurisdiction where its distribution or use would violate local laws or regulations. Dot Point does not function as a brokerage firm and does not accept any form of deposits. The technical solution offered for the Dot Point platforms and data feed is supported by our broker partner Purple Trading."} />
                   
                </Grid>
            </Grid>
        </>
    )
}

export default FooterContent