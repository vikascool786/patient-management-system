import * as React from "react";

//date
import { format } from "date-fns";

//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function AllPatients({ patients }) {
  let navigate = useNavigate();
  return (
    <React.Fragment>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Registered Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {format(new Date(row.created_at), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{format(new Date(row.dob), "dd/MM/yyyy")}</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
}
