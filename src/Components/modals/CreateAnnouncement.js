import React from "react";
import { Modal, Backdrop, Fade, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormik } from "formik";
import * as Yup from "yup";
import MyButton from "../../base/MyButton";
import MyTextField from "../../base/MyTextField";

const validationSchema = Yup.object().shape({
  text: Yup.string().required().label("body of announcement"),
});

function CreateAnnouncement({ open, handleClose, handleCreateAnnouncement }) {
  const formik = useFormik({
    initialValues: { text: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(val) {
    formik.resetForm();
    handleCreateAnnouncement(val);
    handleClose();
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
              Create Announcement
            </Typography>
            <IconButton onClick={handleClose}>
              <CancelIcon sx={{ color: "#f96c59" }} />
            </IconButton>
          </TextContainer>

          <MyTextField
            label="Announcement"
            required
            multiline
            rows={4}
            value={formik.values.text}
            sx={{ mb: "10px" }}
            onChange={formik.handleChange("text")}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
          />

          <MyButton label="create" onClick={formik.handleSubmit} />
        </Container>
      </Fade>
    </Modal>
  );
}

export default CreateAnnouncement;

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
