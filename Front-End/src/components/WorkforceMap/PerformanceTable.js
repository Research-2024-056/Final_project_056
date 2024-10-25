import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
} from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";

const PerformanceTable = ({
  data,
  orderBy,
  order,
  onSort,
  onOpenPopup,
  onOpenPopupSwingActivity,
}) => {
  
  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table size="small" aria-label="Performance Table">
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
                Last Evolution
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.Emp_No}>
              <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                {row.Emp_No}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                {row.Name}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                {row.Evolution_01}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                {row.Evolution_02 < row.Evolution_01 ? (
                  <BookmarkRemoveIcon sx={{ color: "red", fontSize: 18 }} />
                ) : (
                  <BookmarkAddedIcon sx={{ color: "green", fontSize: 18 }} />
                )}
                {row.Evolution_02}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                {row.Evolution_03 < row.Evolution_02 ? (
                  <BookmarkRemoveIcon sx={{ color: "red", fontSize: 18 }} />
                ) : (
                  <BookmarkAddedIcon sx={{ color: "green", fontSize: 18 }} />
                )}
                {row.Evolution_03}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                {row.Evolution_04 < row.Evolution_03 ? (
                  <BookmarkRemoveIcon sx={{ color: "red", fontSize: 18 }} />
                ) : (
                  <BookmarkAddedIcon sx={{ color: "green", fontSize: 18 }} />
                )}
                {row.Evolution_04}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                {row.Evolution_05 < row.Evolution_04 ? (
                  <BookmarkRemoveIcon sx={{ color: "red", fontSize: 18 }} />
                ) : (
                  <BookmarkAddedIcon sx={{ color: "green", fontSize: 18 }} />
                )}
                {row.Evolution_05}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                {row.Last_Evolution < row.Evolution_05 ? (
                  <BookmarkRemoveIcon sx={{ color: "red", fontSize: 18 }} />
                ) : (
                  <BookmarkAddedIcon sx={{ color: "green", fontSize: 18 }} />
                )}
                {row.Last_Evolution}
              </TableCell>

              <TableCell>
                <IconButton onClick={() => onOpenPopup(row)} color="primary">
                  <AnalyticsIcon fontSize="small" />
                </IconButton>

                {row.Evolution_04 > row.Evolution_05 &&
                  row.Evolution_05 > row.Last_Evolution && (
                    <IconButton
                      onClick={() => onOpenPopupSwingActivity(row)}
                      color="secondary"
                    >
                      <ContactEmergencyIcon fontSize="small" />
                    </IconButton>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PerformanceTable;
