import React from 'react'
//component
import PaperContainer from '@components/common/PaperContainer';
import TextLabel from '@components/common/commonTextLabel';

const AnalysisPra = () => {
  return (
    <>
     <PaperContainer
            sx={{
              marginTop: { sm: "10px", xs: "12px" },
              marginBottom: { sm: "20px", xs: "12px" },
            }}
          >
            <TextLabel
              variant="subtitle2"
              title="All information provided on this site is intended solely for educational purposes related to trading on financial markets and does not serve in any way as a specific investment recommendation, business recommendation, investment opportunity analysis or similar general recommendation regarding the trading of investment instruments."
            />
          </PaperContainer>
    </>
  )
}

export default AnalysisPra;