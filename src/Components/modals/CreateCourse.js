import React from "react";
import { Modal, Backdrop, Fade, Typography, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import MyTextField from "../../base/MyTextField";
import MyButton from "../../base/MyButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required().label("Name"),
  description: Yup.string().required().min(30).max(300).label("Description"),
  courseCode: Yup.string()
    .min(5)
    .matches(
      /^[A-Z]{2}[0-9]{3}$/,
      "The first 2 characters must be  capital letters and last 3 must be  numbers"
    )
    .required()
    .label("Course Code"),
});

function CreateCourse({ open, handleClose, handleCreateCourse }) {
  const formik = useFormik({
    initialValues: { name: "", description: "", courseCode: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(val) {
    handleClose();
    formik.resetForm();
    handleCreateCourse(val);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container>
          <TextContainer>
            <Typography
              variant="h3"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              Create Course
            </Typography>
            <IconButton onClick={handleClose}>
              <CancelIcon sx={{ color: "#f96c59" }} />
            </IconButton>
          </TextContainer>

          <MyTextField
            label="Name"
            required
            sx={{ marginBottom: "20px" }}
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <MyTextField
            label="Description"
            required
            multiline
            rows={4}
            sx={{ marginBottom: "20px" }}
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <MyTextField
            label="Course Code"
            required
            value={formik.values.courseCode}
            onChange={formik.handleChange("courseCode")}
            error={
              formik.touched.courseCode && Boolean(formik.errors.courseCode)
            }
            helperText={formik.touched.courseCode && formik.errors.courseCode}
            sx={{ marginBottom: "20px" }}
          />

          <MyButton label="create" onClick={formik.handleSubmit} />
        </Container>
      </Fade>
    </Modal>
  );
}

export default CreateCourse;

const Container = styled("div")`
  width: 400px;
  background-color: #fff;
  flex-direction: column;
  align-content: center;
  padding: 40px;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
`;

const TextContainer = styled("div")`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;
