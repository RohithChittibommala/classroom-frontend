import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../../network";
import { useParams } from "react-router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Submissions() {
  const [assignment, setAssignment] = React.useState({});

  const { assignmentId } = useParams();

  React.useEffect(() => {
    api.getSubmissions(assignmentId).then(({ data }) => {
      setAssignment(data);
    });
  }, [assignmentId]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Submission Time</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Submission</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignment?.submissions?.map((submission) => (
            <StyledTableRow key={submission._id}>
              <StyledTableCell component="th" scope="row">
                {submission?.studentId?.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {submission?.studentId?.email}
              </StyledTableCell>
              <StyledTableCell align="right">
                {new Date(submission.submissionDate).toDateString()} {"  "}
                {new Date(submission.submissionDate).toLocaleTimeString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                {Date.parse(submission.deadline) >
                Date.parse(submission.submissionDate)
                  ? "Late"
                  : "On Time"}
              </StyledTableCell>
              <StyledTableCell align="right">
                <a href={submission.pdf} target="_blank" rel="noreferrer">
                  View Submission
                </a>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
