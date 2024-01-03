import React from "react";
import { Container } from "@mui/material";
import Footer from "@components/common/Footer";
import AlertBox from "@components/common/alertBox";
import InformationBox from "@components/common/informationBox";

const Extras = () => {
  return (
    <>
      <Container>
        <InformationBox
          title={"Extras"}
          description1={`In this section, you can find exclusive discounts for the
                  various trading courses and mentorship programs. We have
                  negotiated these discounts for our traders as we care about
                  your skills development and trading progress. Take advantage
                  of these discounts as such deals are nowhere else to be found.`}
          description2={` Since the services offered in this section are facilitated by
                  third parties, Dot Point does not bear any responsibility for its
                  use or content. Use them at your own discretion.`}
        />

        <AlertBox
          img={"ThumbUpOutlinedIcon"}
          description={`This section includes discounts for our partner's education and mentor programs. These exclusive deals are available for traders who had at least one paid Challenge in the past. Accept our Challenge and enjoy all benefits Dot Point gives you.`}
          backgroundColor={"#d8e4f6"}
          borderColor={"#3984ff"}
        />

        
      </Container>
    </>
  );
};

export default Extras;
