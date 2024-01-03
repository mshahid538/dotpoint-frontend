import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Grid, Typography, Box, Divider, InputAdornment, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import ClientDetailsLable from "./ClientDetailsLable";
import ClientResult from "./ClientResult";
import ClientVible from "./ClientVisible";
import CommonModal from "@components/common/commonModel";
import Assets from "@components/common/image_container";
import TextLabel from "@components/common/commonTextLabel";
import { tostify } from "@components/common/tostify";
import { challenge_approval, user_profile } from "@redux/Redux/Actions";
import usePageLoader from "@redux/hooks/usePageLoader";
import { lightTheme } from "@redux/theme";
import ErrorHandler from "@components/common/errorHandler";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function ClientArea() {
  const router = useRouter();
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();
  const isAuthenticated = localStorage.getItem("access_token");
  const theme = useTheme()
  //States
  const [model, setModel] = useState<any>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [clientData, setclientData] = useState<any>();
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const _getUserDetails = async () => {
    try {
      setFullPageLoader(true);
      const response = await dispatch(user_profile());
      const error = ErrorHandler(response);
      if (error) {
        setclientData(response.payload.data);
      }
      setFullPageLoader(false);
    } catch (error: any) {
      toast.success(error.message, { position: toast.POSITION.TOP_RIGHT });
      setFullPageLoader(false);
    }
  };
  const handleToggleChange = (item: any, checked: any) => {
    const data = clientData?.tradingAccounts?.map((ele: any) =>
      ele?._id === item?._id ? { ...ele, isShow: checked } : ele
    );
    setclientData({
      tradingAccounts: data,
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      _getUserDetails();
    }
  }, [isAuthenticated, router.isReady]);


  const _approveRequest = async (item: any) => {

    setFullPageLoader(true);
    const body = {
      challengeUserId: item?.challengeUserId,
      login: item?.login,
      accountId: item?.accountId,
      isStep1: item?.step1Completed,
      isStep2: item?.step2Completed,
    };
    const response = await dispatch(challenge_approval(body));
    const error = ErrorHandler(response);

    if (error) {
      toast.success(response?.payload?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      _getUserDetails();
      setFullPageLoader(false);
    }
    setFullPageLoader(false);
  };
  return (
    <>
      {clientData?.tradingAccounts &&
        clientData?.tradingAccounts?.map((item: any, i: any) => (
          <>
            <Box
              sx={{
                display: { sm: "flex", xs: "block" },
                justifyContent: "space-between",
                gap: "20px",
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: "wrap",
                alignItems: !item?.isShow ? "end" : "center",
              }}
            >
              <Box>
                <TextLabel title={`Login: ${item?.login}`} />
                {!item?.isShow ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: "6px", sm: "20px" },
                        marginTop: "3px",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <ClientResult
                        minWidth="150px"
                        heading="Balance:"
                        subheading={item?.currentAccountBalance}
                      />
                      <ClientResult
                        minWidth="150px"
                        heading="End:"
                        subheading={moment(item?.endChallengeDate).format(
                          "DD-MM-YYYY"
                        )}
                      />
                      <ClientResult
                        minWidth="150px"
                        heading="Result:"
                        subheading="Ongoing"
                        fontColor={lightTheme.palette.warning.main}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: "6px", sm: "40px" },
                        marginTop: "12px",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <ClientDetailsLable
                        img={"/assets/icons/key.svg"}
                        onClick={() => setModel(item)}
                        text="Credentials"
                      />
                      <ClientDetailsLable
                        img={"/assets/icons/statistics.svg"}
                        text="Statistics"
                        onClick={() =>
                          router.push({
                            pathname: "/statistics",
                            query: {
                              accountId: item?.accountId,
                              challengeUserId: item?.challengeUserId,
                            },
                          })
                        }
                      />
                      <ClientDetailsLable
                        img={"/assets/icons/analysis.svg"}
                        text="Analysis"
                        onClick={() =>
                          router.push({
                            pathname: "/analysis",
                            query: {
                              accountId: item?.accountId,
                              challengeUserId: item?.challengeUserId,
                            },
                          })
                        }
                      />
                    </Box>
                  </>
                ) : null}
              </Box>

              {item?.step2Completed ? (
                item?.step2Status === 0 ? (
                  <TextLabel
                    title={`Your Request is in progress`}
                    style={{ color: "rgb(255, 199, 0)" }}
                  />
                ) : item?.step2Status === 1 ? (
                  <TextLabel
                    title={`Your Request is approved`}
                    style={{ color: "green" }}
                  />
                ) : item?.step2Status === 2 ? (
                  <TextLabel
                    title={`Your Request is rejected`}
                    style={{ color: "red" }}
                  />
                ) : (
                  <TextLabel
                    title={`Request for complete step 2`}
                    style={{
                      borderBottom: "1px solid blue",
                      color: "blue",
                      cursor: "pointer",
                    }}
                    onClick={() => _approveRequest(item)}
                  />
                )
              ) : item?.step1Completed ? (
                item?.step1Status === 0 ? (
                  <TextLabel
                    title={`Your Request is in progress`}
                    style={{ color: "rgb(255, 199, 0)" }}
                  />
                ) : item?.step1Status === 1 ? (
                  <TextLabel
                    title={`Your Request is approved`}
                    style={{ color: "green" }}
                  />
                ) : item?.step1Status === 2 ? (
                  <TextLabel
                    title={`Your Request is rejected`}
                    style={{ color: "red" }}
                  />
                ) : (
                  <TextLabel
                    title={`Request for complete step 1`}
                    style={{
                      borderBottom: "1px solid blue",
                      color: "blue",
                      cursor: "pointer",
                    }}
                    onClick={() => _approveRequest(item)}
                  />
                )
              ) : (
                ""
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "end",
                  marginTop: { sm: "0", xs: "12px" },
                }}
              >
                <ClientVible
                  isToggled={!item?.isShow}
                  handleToggleChange={() =>
                    handleToggleChange(item, !item?.isShow)
                  }
                  visible="Visible "
                  visibleswitch="switch"
                />
              </Box>
            </Box>
            {i < clientData.tradingAccounts.length - 1 && (
              <Divider sx={{ margin: "24px 0" }} />
            )}
            {/* <Divider sx={{ margin: "24px 0" }} /> */}
            {/* <Grid key={i} container spacing={2} borderBottom={(clientData?.tradingAccounts?.length - 1) === i ? "none" : "1px solid #EEEEEE"} padding={"22px 0"}>
                        <Grid item xs={isToggled ? 12 : 6}>
                            <TextLabel title={`Login: ${item?.login}`} />
                        </Grid>
                        {isToggled ? (
                            <>
                                <Grid item container xs={12} md={12}>
                                    <Grid xs={12} sm={6} md={4} lg={3} xl={2}><ClientResult heading="Balance:" subheading={item?.accountBalance} /></Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3} xl={2}><ClientResult heading="End:" subheading="-" /></Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3} xl={2}><ClientResult heading="Result:" subheading="Ongoing" color="#FFC700" /></Grid>
                                </Grid>
                                <Grid item container xs={12} md={12} lg={10} >
                                    <Grid xs={12} sm={6} md={4} lg={3} xl={2}><ClientDetailsLable img={"/assets/icons/key.svg"} handleOpen={() => setModel(item)} text="Credentials" /></Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3} xl={2}><ClientDetailsLable img={"/assets/icons/statistics.svg"} text="Statistics" /></Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3} xl={2}><ClientDetailsLable img={"/assets/icons/analysis.svg"} text="Analysis" /></Grid>
                                </Grid>
                                <Grid item xs={isToggled ? 12 : 6} lg={2}   display={"flex"} justifyContent={"end"} >
                                    <ClientVible isToggled={isToggled} handleToggleChange={handleToggleChange} visible="Visible " visibleswitch="switch" />
                                </Grid>
                            </>
                        ) : null}
                    </Grid> */}
          </>
        ))}
      <CommonModal
        open={model}
        onClose={() => setModel(false)}
        title={"Login Credentials"}
      >
        <>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{ borderBottom: "1px solid #eee", paddingBottom: "16px" }}
                >
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item sm={4} xs={12}>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"Login:"}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={model?.login}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <Assets
                          src={"/assets/icons/copy.svg"}
                          absolutePath={true}
                          onClick={() => {
                            navigator.clipboard.writeText(model?.login);
                            tostify(`copied to clipboard!`, "success");
                          }}
                          style={{
                            cursor: "pointer",
                            border: "1px solid #eee",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        />
                        <TextLabel
                          fontWeight="400"
                          variant="subtitle2"
                          title={"Copy"}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ borderBottom: "1px solid #eee", paddingBottom: "16px" }}
                >
                  <Grid container spacing={2}>
                    <Grid item sm={4} xs={12}>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"Master password:"}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box display={"flex"} sx={{ alignItems: "center" }}>
                        <Typography>
                          {showPassword
                            ? model?.password
                            : "•".repeat(model?.password?.length)}
                        </Typography>
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon style={{ fontSize: "21px" }} />
                            ) : (
                              <VisibilityOffIcon style={{ fontSize: "21px" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      </Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "12px",
                          flexDirection: "column",
                        }}
                      >
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                          <Assets
                            src={"/assets/icons/copy.svg"}
                            absolutePath={true}
                            onClick={() => {
                              navigator.clipboard.writeText(model?.password);
                              tostify(`copied to clipboard!`, "success");
                            }}
                            style={{
                              cursor: "pointer",
                              border: "1px solid #eee",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          />
                          <TextLabel
                            fontWeight="400"
                            variant="subtitle2"
                            title={"Copy"}
                          />
                        </Box>
                        <Box>
                          <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Box
                              border={"1px solid #EEE"}
                              borderRadius={"5px"}
                              padding={"5px"}
                              display={"flex"}
                            >
                              <Assets
                                src={"/assets/icons/change.svg"}
                                absolutePath={true}
                              />
                            </Box>
                            <TextLabel
                              fontWeight="400"
                              variant="subtitle2"
                              title={"Change"}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ borderBottom: "1px solid #eee", paddingBottom: "16px" }}
                >
                  <Grid container spacing={2}>
                    <Grid item sm={4} xs={12}>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"Read-only password:"}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"CV6ZK79"}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "12px",
                          flexDirection: "column",
                        }}
                      >
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                          <Assets
                            src={"/assets/icons/copy.svg"}
                            absolutePath={true}
                            onClick={() => {
                              navigator.clipboard.writeText("CV6ZK79");
                              tostify(`copied to clipboard!`, "success");
                            }}
                            style={{
                              cursor: "pointer",
                              border: "1px solid #eee",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          />
                          <TextLabel
                            fontWeight="400"
                            variant="subtitle2"
                            title={"Copy"}
                          />
                        </Box>
                        <Box>
                          <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Box
                              border={"1px solid #EEE"}
                              borderRadius={"5px"}
                              padding={"5px"}
                              display={"flex"}
                            >
                              <Assets
                                src={"/assets/icons/change.svg"}
                                absolutePath={true}
                              />
                            </Box>
                            <TextLabel
                              fontWeight="400"
                              variant="subtitle2"
                              title={"Change"}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ borderBottom: "1px solid #eee", paddingBottom: "16px" }}
                >
                  <Grid container spacing={2}>
                    <Grid item sm={4} xs={12}>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"Server:"}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={model?.serverURL}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <Assets
                          src={"/assets/icons/copy.svg"}
                          absolutePath={true}
                          onClick={() => {
                            navigator.clipboard.writeText(model?.serverURL);
                            tostify(`copied to clipboard!`, "success");
                          }}
                          style={{
                            cursor: "pointer",
                            border: "1px solid #eee",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        />
                        <TextLabel
                          fontWeight="400"
                          variant="subtitle2"
                          title={"Copy"}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextLabel
                  marginTop="24px"
                  fontWeight="600"
                  variant="h6"
                  title={"Platform: MT5"}
                  color={"#333"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextLabel
                  fontWeight="600"
                  variant="subtitle2"
                  title={"Mobile"}
                  color={"#333"}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "16px",
                  }}
                >
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Assets
                      src={"/assets/images/android.jpg"}
                      absolutePath={true}
                    />
                    <Box>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"Android"}
                        color={"#333"}
                      />
                      <a
                        href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en&referrer=ref_id%3d4946019784992326989%26utm_source%3dwww.metatrader5.com%26utm_campaign%3dinstall.metaquotes"
                        target="_blank"
                      >
                        <TextLabel
                          fontWeight="400"
                          variant="subtitle2"
                          title="Download"
                          color={'blue'}
                        />
                      </a>
                    </Box>
                  </Box>
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Assets
                      src={"/assets/images/ios.jpg"}
                      absolutePath={true}
                    />
                    <Box>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"IOS"}
                        color={"#333"}
                      />
                      <a
                        href="https://apps.apple.com/us/app/metatrader-5/id413251709?utm_campaign=install.metaquotes&utm_source=www.metatrader5.com"
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <TextLabel
                          fontWeight="400"
                          variant="subtitle2"
                          title="Download"
                          color="#0099CB"
                        />
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextLabel
                  fontWeight="600"
                  variant="subtitle2"
                  title={"Desktop"}
                  color={"#333"}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "16px",
                  }}
                >
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Assets
                      src={"/assets/images/windows.png"}
                      absolutePath={true}
                    />
                    <Box>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"Windows"}
                        color={"#333"}
                      />
                      <a
                        href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader5.com&utm_campaign=download"
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <TextLabel
                          fontWeight="400"
                          variant="subtitle2"
                          title="Download"
                          color="#0099CB"
                        />
                      </a>
                    </Box>
                  </Box>
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Assets
                      src={"/assets/images/ios.jpg"}
                      absolutePath={true}
                    />
                    <Box>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"MacOS"}
                        color={"#333"}
                      />
                      <a
                        href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.pkg.zip?utm_source=www.metatrader5.com&utm_campaign=download.mt5.macos"
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <TextLabel
                          fontWeight="400"
                          variant="subtitle2"
                          title="Download"
                          color="#0099CB"
                        />
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextLabel
                  fontWeight="600"
                  variant="subtitle2"
                  title={"Web"}
                  color={"#333"}
                />
                <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Assets
                      src={"/assets/images/web_platform.png"}
                      absolutePath={true}
                    />
                    <Box>
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title={"Web"}
                        color={"#333"}
                      />
                      <TextLabel
                        fontWeight="400"
                        variant="subtitle2"
                        title="Web Platform"
                        color="#0099CB"
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  bgcolor={"#0099cb33"}
                  borderRadius={"5px"}
                  padding={2}
                  alignItems={"center"}
                >
                  <TextLabel
                    fontWeight="600"
                    variant="subtitle2"
                    title={
                      "*We recommend using the desktop platform as the webtrader does not store history."
                    }
                    color={"#333"}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      </CommonModal>
      {/* ))} */}
    </>
  );
}

export default ClientArea;
