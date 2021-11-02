import React, { useRef, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import DropBoxChooser from "react-dropbox-chooser";
import { useFormik } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import DateTimePicker from "@mui/lab/DateTimePicker";
import * as Yup from "yup";
import MyButton from "../../base/MyButton";
import MyTextField from "../../base/MyTextField";
import api from "../../network";

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label("Description"),
  deadline: Yup.date().required().label("Deadline"),
});

//  date: Date;
//  deadline: Date;
//  description: string;
//  pdf: string;

// next day date using new Date()
// const tomorrow = new Date();

// make sure that deadline is atleast tomorrow

const date = new Date();
const tomorrow = new Date(date.getTime() + 30 * 60 * 1000);

function CreateAssignment({ open, handleClose, handleCreateAssignment }) {
  const inputRef = useRef();

  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: { description: "", deadline: tomorrow },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(val) {
    console.log(val);

    const data = { ...val, pdf: file };

    formik.resetForm();

    setFile(null);

    handleCreateAssignment(data);
    handleClose();
  }

  const onUploadSuccess = (files) => {
    console.log(files);
  };

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
              Create Assignment
            </Typography>
            <IconButton onClick={handleClose}>
              <CancelIcon sx={{ color: "#f96c59" }} />
            </IconButton>
          </TextContainer>

          <MyTextField
            label="Description"
            required
            multiline
            rows={4}
            value={formik.values.description}
            sx={{ mb: "10px" }}
            onChange={formik.handleChange("description")}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <DateTimePicker
            renderInput={(props) => (
              <MyTextField sx={{ mb: "10px" }} {...props} />
            )}
            label="DeadLine"
            inputFormat="dd/MM/yyyy hh:mm a"
            // minDate={new Date(new Date().getTime() + 30 * 60 * 1000)}
            value={formik.values.deadline}
            onChange={(date) =>
              formik.setFieldValue("deadline", new Date(date))
            }
          />

          <DropBoxChooser
            appKey={"33gskexm27bl6ql"}
            success={onUploadSuccess}
            cancel={() => console.log("closed")}
          >
            <Button
              variant="outlined"
              endIcon={<CloudUploadRoundedIcon />}
              sx={{ mb: "10px" }}
            >
              Upload File
            </Button>
          </DropBoxChooser>
          <MyButton
            label="create"
            sx={{ display: "block" }}
            onClick={formik.handleSubmit}
          />
        </Container>
      </Fade>
    </Modal>
  );
}

export default CreateAssignment;

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

const UploadedFile = styled("div")`
  display: flex;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #dedede;
  background-color: hsl(0, 6%, 95%);
`;
