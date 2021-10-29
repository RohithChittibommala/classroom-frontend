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
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(6).required().label("Password"),
});

function CreateInstructor({ open, handleClose, handleCreateInstructor }) {
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(val) {
    handleClose();
    formik.resetForm();
    handleCreateInstructor({ ...val, role: "instructor" });
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
              Create Instructor
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
            label="Email"
            required
            sx={{ marginBottom: "20px" }}
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <MyTextField
            label="Password"
            required
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ marginBottom: "20px" }}
          />

          <MyButton label="create" onClick={formik.handleSubmit} />
        </Container>
      </Fade>
    </Modal>
  );
}

export default CreateInstructor;

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
