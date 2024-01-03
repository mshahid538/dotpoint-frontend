import React from "react";
import {
  Container,
} from "@mui/material";
import Footer from "@components/common/Footer";
import InformationBox from "@components/common/informationBox";

const TradingAcademy = () => {
  return (
    <>
      <Container>
        <InformationBox
          title={"Dot Point Academy"}
          description1={`Learn trading knowledge from basic to advanced levels, test
          yourself, and move closer to trading with up to $200,000 on an
          Dot Point Account. Gain access to comprehensive materials,
          progress, take exams and receive rewards. Our Dot Point Academy is
          free for everyone interested in becoming a serious trader. Are
          you ready to become one of them?`}
          isButton={true}
          buttonText={"Dot Point Academy"}
        />
        
      </Container>
    </>
  );
};

export default TradingAcademy;
