import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

const PerformanceTable = ({
  data,
  orderBy,
  order,
  onSort,
  onOpenPopup,
  onOpenPopupSwingActivity,
  toggleDisplay,
}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Emp_No"}
              direction={orderBy === "Emp_No" ? order : "asc"}
              onClick={() => onSort("Emp_No")}
            >
              Employee ID
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Name"}
              direction={orderBy === "Name" ? order : "asc"}
              onClick={() => onSort("Name")}
            >
              Employee Name
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Evolution_01"}
              direction={orderBy === "Evolution_01" ? order : "asc"}
              onClick={() => onSort("Evolution_01")}
            >
              Evolution 01
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Evolution_02"}
              direction={orderBy === "Evolution_02" ? order : "asc"}
              onClick={() => onSort("Evolution_02")}
            >
              Evolution 02
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Evolution_03"}
              direction={orderBy === "Evolution_03" ? order : "asc"}
              onClick={() => onSort("Evolution_03")}
            >
              Evolution 03
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Evolution_04"}
              direction={orderBy === "Evolution_04" ? order : "asc"}
              onClick={() => onSort("Evolution_04")}
            >
              Evolution 04
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Evolution_05"}
              direction={orderBy === "Evolution_05" ? order : "asc"}
              onClick={() => onSort("Evolution_05")}
            >
              Evolution 05
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Last_Evolution"}
              direction={orderBy === "Last_Evolution" ? order : "asc"}
              onClick={() => onSort("Last_Evolution")}
            >
              Last_Evolution
            </TableSortLabel>
          </TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.Emp_No}>
            <TableCell>{row.Emp_No}</TableCell>
            <TableCell>{row.Name}</TableCell>
            <TableCell>{row.Evolution_01}</TableCell>
            <TableCell>
              {row.Evolution_02 < row.Evolution_01 ? (
                <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
              ) : (
                <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
              )}
              {row.Evolution_02}
            </TableCell>
            <TableCell>
              {row.Evolution_03 < row.Evolution_02 ? (
                <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
              ) : (
                <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
              )}
              {row.Evolution_03}
            </TableCell>
            <TableCell>
              {row.Evolution_04 < row.Evolution_03 ? (
                <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
              ) : (
                <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
              )}
              {row.Evolution_04}
            </TableCell>
            <TableCell>
              {row.Evolution_05 < row.Evolution_04 ? (
                <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
              ) : (
                <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
              )}
              {row.Evolution_05}
            </TableCell>
            <TableCell>
              {row.Last_Evolution < row.Evolution_05 ? (
                <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
              ) : (
                <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
              )}
              {row.Last_Evolution}
            </TableCell>

            <TableCell>
                
              <IconButton onClick={() => onOpenPopup(row)} color="primary">
                <Visibility />
              </IconButton>

              {row.Evolution_04 > row.Evolution_05 &&
                    row.Evolution_05 > row.Last_Evolution && (
              <IconButton
                onClick={() => onOpenPopupSwingActivity(row)}
                color="secondary"
              >
                <Edit />
              </IconButton>)}
            </TableCell>


          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PerformanceTable;
