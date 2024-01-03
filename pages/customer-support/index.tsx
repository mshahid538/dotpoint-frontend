import React, { ReactNode } from "react";
import { Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
//mui
import { makeStyles } from "tss-react/mui";
import { Box, Grid, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
//component
import CommonTextField from "@components/common/commonTextField";
import MUIButton from "@components/common/commonButton";
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import PaperContainer from "@components/common/PaperContainer";
import TextLabel from "@components/common/commonTextLabel";
import { customer_support, uploadImg } from "@redux/Redux/Actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import usePageLoader from "@redux/hooks/usePageLoader";

const useStyles = makeStyles()((theme) => {
  return {
    attachFiled: {
      marginTop: "6px",
      display: "flex",
      color: "#cdcdcd",
      cursor: "grab",
      position: "relative",
      overflow: "hidden",
      padding: "11px 10px",
      border: "1px dashed #cdcdcd",
      borderRadius: "10px",
    },
  };
});
const validationSchema = Yup.object().shape({
  subject: Yup.string().required("Please enter Subject."),
  content: Yup.string().required("Please enter Content."),
  file: Yup.mixed().required("Please select file.")
    .test("fileType", "File must be a PNG, JPG, JPEG, SVG, or WEBP format.",
      (value: any) => {
        if (value) {
          const fileName = value;
          const fileExtension = fileName.split('.').pop();
          return (
            fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "svg" || fileExtension === "webp"
          );
        } else {
          return true;
        }
      }
    )
});

const CustomerSupports = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();

  const [selectedImage, setSelectedImage] = React.useState<any>(null);

  const handleImageChange = async (val: any, setFieldValue: any) => {

    const formData = new FormData();
    formData.append("image", val);
    try {
      let res = await dispatch(uploadImg(formData));
      if (res?.payload?.status === 200) {
        setSelectedImage(res?.payload?.data?.image);
        setFieldValue("file", res?.payload?.data?.image);
      } else {
        toast.error("Something Went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("An error occurred during login", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setSelectedImage("");
    }
  };

  interface Breadcrumb {
    label: ReactNode;
    path: string;
  }

  const breadcrumbsData: Breadcrumb[] = [
    {
      label: "Trader",
      path: "/",
    },
    {
      label: "Customer Support",
      path: "#",
    },
  ];

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setFullPageLoader(true);
    const body = {
      subject: values?.subject,
      content: values?.content,
      attachments: [values?.file],
    };
    const res = await dispatch(customer_support(body));
    toast.success("Ticket added successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    resetForm();
    setFullPageLoader(false);
    setSubmitting(false);
  };

  return (
    <>
      <BreadcrumbLayout
        breadcrumb={breadcrumbsData}
        breadcrumbTitle="Open New Ticket"
      >
        <PaperContainer title={"Open New Ticket"}>
          <Formik
            initialValues={{
              subject: "",
              content: "",
              file: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CommonTextField
                      text="Subject"
                      size="medium"
                      type="text"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      width="100%"
                    />
                    <ErrorMessage name="subject">
                      {(msg) => (
                        <Typography variant="caption"  fontSize={'12px'} style={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12}>
                    <CommonTextField
                      text="Content"
                      size="medium"
                      type="text"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      width="100%"
                      multiline
                      rows={3}
                    />
                    <ErrorMessage name="content">
                      {(msg) => (
                        <Typography variant="caption"  fontSize={'12px'} style={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sx={{ cursor: "grab" }}>
                    <TextLabel variant="body1" title={"Attachment"} />
                    <Box
                      className={classes.attachFiled}
                      style={{ position: "relative" }}
                    >
                      <label
                        htmlFor="icon-button-photo"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "grab",
                        }}
                      >
                        <AddCircleOutlineOutlinedIcon
                          sx={{ marginRight: "8px" }}
                        />
                        {values?.file
                          ? values?.file
                          : "Click here to upload file"}
                      </label>

                      <input
                        id="icon-button-photo"
                        onChange={(e: any) => {
                          handleImageChange(e?.target?.files[0], setFieldValue);
                        }}
                        type="file"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "grab",
                          top: 0,
                          left: 0,
                        }}
                        accept="image/png,image/jpeg,image/jpg,image/svg,image/webp"
                      />
                    </Box>
                    <ErrorMessage name="file">
                      {(msg) => (
                        <Typography variant="caption" style={{ color: "red" }} fontSize={'12px'}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <MUIButton
                        fullWidth={true}
                        height="42px"
                        width="30%"
                        text="Submit"
                        type="submit"
                        fontWeight="600"
                        marginTop={2}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </PaperContainer>
      </BreadcrumbLayout>
    </>
  );
};

export default CustomerSupports;
