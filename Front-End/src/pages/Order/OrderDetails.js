import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import PageMain from "../../components/PageMain";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database"; // Adjust the path as necessary
import { projectFirestore } from "../../components/firebase-config";
function OrderDetails() {
  const { ordernumber } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [orderAssemblyData, setOrderAssemblyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const fetchData = () => {
      const orderRef = ref(projectFirestore, `/Orders`);
      const queryRef = query(
        orderRef,
        orderByChild("OrderNumber"),
        equalTo(ordernumber)
      );
      onValue(
        queryRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const order = Object.values(data)[0]; // Assuming only one order matches
            setOrderData(order);
            setOrderNumber(order.OrderNumber);
            setOrderAssemblyData(order.assemblyOrders || {});
            console.log(order.assemblyOrders);
          }
          setLoading(false);
        },
        (error) => {
          setError("Error fetching data");
          setLoading(false);
        }
      );
    };

    fetchData();
  }, [ordernumber]);

  if (loading) {
    return (
      <PageMain>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </PageMain>
    );
  }

  if (error) {
    return (
      <PageMain>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </PageMain>
    );
  }

  const handleButtonClick = (ordernumberNavigate) => {
    navigate("/Createworkload", { state: ordernumberNavigate }); // Navigate to Services page
  };

  return (
    <PageMain>
      <Typography
        sx={{
          lineHeight: 1,
          fontWeight: "500",
          fontSize: "1.625rem",
          fontFamily: "poppins",
        }}
      >
        Order Page
      </Typography>

      <form onSubmit={handleButtonClick}>
        <Box
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              fontSize: "1.5rem",
              fontFamily: "poppins",
              color: "darkblue",
              marginLeft: "5%",
            }}
          >
            Order Number
          </Typography>
          <TextField
            value={orderData.OrderNumber}
            disabled
            sx={{ width: "70%" }}
          />
        </Box>
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              fontSize: "1.5rem",
              fontFamily: "poppins",
              color: "darkblue",
              marginLeft: "5%",
            }}
          >
            Start Date
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            disabled
            value={orderData.StartDate}
          />
        </Box>
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              fontSize: "1.5rem",
              fontFamily: "poppins",
              color: "darkblue",
              marginLeft: "5%",
            }}
          >
            End Date
          </Typography>
          <TextField sx={{ width: "70%" }} disabled value={orderData.EndDate} />
        </Box>

        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              fontSize: "1.5rem",
              fontFamily: "poppins",
              color: "darkblue",
              marginLeft: "5%",
            }}
          >
            Number of Units
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            disabled
            value={orderData.NumberOfUnits}
          />
        </Box>

        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              fontSize: "1.5rem",
              fontFamily: "poppins",
              color: "darkblue",
              marginLeft: "5%",
            }}
          >
            End Use
          </Typography>
          <TextField sx={{ width: "70%" }} disabled value={orderData.EndUse} />
        </Box>

        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              fontSize: "1.5rem",
              fontFamily: "poppins",
              color: "darkblue",
              marginLeft: "5%",
            }}
          >
            Fabric Method
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            disabled
            value={orderData.FabricMethod}
          />
        </Box>

        {/* Render fiber content fields based on the selected fabric method */}
        {orderData.FabricMethod &&
          orderData.FiberContent.map((fiber, index) => (
            <Box
              sx={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={index}
            >
              <Typography
                sx={{
                  lineHeight: 1,
                  fontSize: "1.5rem",
                  fontFamily: "poppins",
                  color: "darkblue",
                  marginLeft: "5%",
                }}
              >
                Fiber Content
              </Typography>
              <TextField
                sx={{ width: "70%" }}
                disabled
                value={orderData.FiberContent}
              />
            </Box>
          ))}

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(orderNumber)}
          sx={{ width: "30%", marginLeft: "40%" }}
        >
          Create Machine Work Load
        </Button>

        {/* <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            if (orderData?.Started === "true") {
              window.location.href = `/realTimeDashboard/${orderData.MachineNumber}/${orderData.OrderNumber}`; // Navigate to specific order page
            } else if (orderData?.Started === "false") {
              window.location.href = `/needledashboard/${orderData.MachineNumber}`; // Navigate to needle dashboard
            } else {
              handleSubmit(event); // Pass event to handleSubmit when order is not started
            }
          }}
          sx={{ width: "30%", marginLeft: "40%" }}
        >
          {orderData?.Started === "true"
            ? "Go To Order" // Label for active order
            : orderData?.Started === "false"
            ? "Order Completed" // Label for completed order
            : "Start Order"}{" "}
        </Button> */}
      </form>
      <br></br>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, fontFamily: "Poppins", marginBottom: "3%" }}
      >
        Order Work Load Distribution
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#063970",
              }}
            >
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Machine Number
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Assembly Type
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Needle Type
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Stitch Pattern
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Employee
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(orderAssemblyData).map(([keys, assemblyData]) => (
              <TableRow
                key={keys}
                component={Link} // Make the Box a Link component
                to={`/workload/${ordernumber}/${keys}`}
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#F1F1F1", // Optional hover effect
                  },
                }}
              >
                <TableCell>{assemblyData.machineNumber}</TableCell>
                <TableCell>{assemblyData.assemblyType}</TableCell>
                <TableCell>{assemblyData.needleType}</TableCell>
                <TableCell>{assemblyData.stitchPattern}</TableCell>
                <TableCell>{assemblyData.employee}</TableCell>
                <TableCell>
                  {assemblyData.Started === "true" ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      In Progress
                    </span>
                  ) : assemblyData.Started === "false" ? (
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      Completed
                    </span>
                  ) : (
                    <span style={{ color: "gray", fontWeight: "bold" }}>
                      Not Started
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageMain>
  );
}

export default OrderDetails;
