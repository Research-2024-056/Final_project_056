import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import PageMain from "../../components/PageMain";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  push,
  get,
} from "firebase/database"; // Adjust the path as necessary
import { projectFirestore } from "../../components/firebase-config";

const machinenumberoptions = [
  { value: "machine1", label: "machine1" },
  { value: "machine2", label: "machine2" },
  { value: "machine3", label: "machine3" },
  { value: "machine4", label: "machine4" },
  { value: "machine5", label: "machine5" },
  { value: "machine6", label: "machine6" },
  { value: "machine7", label: "machine7" },
  { value: "machine8", label: "machine8" },
  { value: "machine9", label: "machine9" },
];
const needleOptions = [
  { value: "needle_100-16", label: "Needle 100-16" },
  { value: "needle_110-18", label: "Needle 110-18" },
  { value: "needle_70-90", label: "Needle 70-90" },
  { value: "needle_90-14", label: "Needle 90-14" },
];
const assemblyOption = [
  { value: "Attaching Sleeves", label: "Attaching Sleeves" },
  { value: "Side Seams", label: "Side Seams" },
  { value: "Collar Attachment", label: "Collar Attachment" },
  { value: "Hemming", label: "Hemming" },
  { value: "Sewing Darts", label: "Sewing Darts" },
  { value: "Adding Pockets", label: "Adding Pockets" },
  { value: "Zipper Insertion", label: "Zipper Insertion" },
  { value: "Bias Binding", label: "Bias Binding" },
  { value: "Sewing Pleats", label: "Sewing Pleats" },
  { value: "Gathering Fabric", label: "Gathering Fabric" },
  { value: "Attaching Waistbands", label: "Attaching Waistbands" },
  { value: "Sewing Yokes", label: "Sewing Yokes" },
  { value: "Adding Linings", label: "Adding Linings" },
  { value: "Tacking", label: "Tacking" },
  { value: "Flatlocking", label: "Flatlocking" },
  { value: "Sewing Ruffles", label: "Sewing Ruffles" },
  { value: "Buttonhole", label: "Buttonhole" },
  { value: "Topstitching", label: "Topstitching" },
  { value: "Sewing Gores", label: "Sewing Gores" },
  { value: "Sewing Facings", label: "Sewing Facings" },
  { value: "Sewing Binding on Armholes", label: "Sewing Binding on Armholes" },
  {
    value: "Sewing Linings into Sleeves",
    label: "Sewing Linings into Sleeves",
  },
];

function WorkLoad() {
  const location = useLocation();
  const orderNumber = location.state;
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [machineNumber, setMachineNumber] = useState("");
  const [needleType, setNeedleType] = useState("");
  const [assemblyType, setAssemblyType] = useState("");
  const [stichpattern, setStichPattern] = useState("");
  const [employee, setEmployee] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleSubmit = async (
    // Ensure orderNumber is a parameter
    assemblyType,
    machineNumber,
    needleType,
    stitchPattern,
    employee
  ) => {
    if (
      !assemblyType ||
      !machineNumber ||
      !needleType ||
      !stitchPattern ||
      !employee
    ) {
      alert("Please enter all necessary data");
    } else {
      try {
        const orderRef = ref(projectFirestore, `/Orders`);
        const queryRef = query(
          orderRef,
          orderByChild("OrderNumber"), // Order by OrderNumber
          equalTo(orderNumber) // Equal to the provided order number
        );

        const snapshot = await get(queryRef); // Use get for a one-time read
        const data = snapshot.val();

        if (data) {
          const orderKey = Object.keys(data)[0]; // Get the first order's key
          const assemblyOrderRef = ref(
            projectFirestore,
            `/Orders/${orderKey}/assemblyOrders`
          );

          const newAssemblyOrderRef = await push(assemblyOrderRef, {
            machineNumber,
            needleType,
            assemblyType,
            stitchPattern,
            employee,
          });
          const newDocumentId = newAssemblyOrderRef.key;

          alert("New Assembly Order Created Successfully!");
          navigate(`/workload/${orderNumber}/${newDocumentId}`);
          // navigate(`/needledashboard/${orderData[0].MachineNumber}`);
        } else {
          alert(
            `Order with the specified OrderNumber (${orderNumber}) not found.`
          );
        }
      } catch (error) {
        console.error("Error creating assembly order:", error); // Log error for debugging
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleDirectToHome = () => {
    navigate(`/OrderDetails/${orderNumber}`);
  };

  useEffect(() => {
    const fetchData = () => {
      const employeeRef = ref(projectFirestore, `/Orders`);
      const queryRef = query(
        employeeRef,
        orderByChild("OrderNumber"),
        equalTo(orderNumber)
      );
      onValue(
        queryRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const order = Object.values(data)[0]; // Assuming only one order matches
            setOrderData(order);
            console.log("order", order);
          }
          setLoading(false);
        },
        (error) => {
          setError("Error fetching data");
          setLoading(false);
        }
      );
    };
    const fetchEmployee = () => {
      const employeeRef = ref(projectFirestore, `/Employees`);
      onValue(employeeRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const employees = Object.entries(data).map(([key, value]) => ({
            label: value.Name, // Add label for display in dropdown
            value: value.Name, // Add value for unique identification
          }));
          setEmployees(employees);
        }
      });
    };

    fetchData();
    fetchEmployee();
  }, [orderNumber]);

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

  const usedMachineNumbers = Object.values(orderData?.assemblyOrders || {}).map(
    (order) => order.machineNumber
  );

  // Filter the machine number options
  const availableMachineNumberOptions = machinenumberoptions.filter(
    (option) => !usedMachineNumbers.includes(option.value)
  );

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
        Create Work Load for Order
      </Typography>
      <Box
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              fontSize: "1.5rem",
              fontFamily: "poppins",
              color: "darkblue",
              marginLeft: "5%",
              width: "20%",
            }}
          >
            Order Number
          </Typography>
          <TextField
            value={orderData.OrderNumber}
            disabled
            sx={{ width: "50%" }}
          />
        </Box>

        <Box
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              fontSize: "1.5rem",
              fontFamily: "poppins",
              color: "darkblue",
              marginLeft: "5%",
              width: "20%",
            }}
          >
            End Use
          </Typography>
          <TextField sx={{ width: "50%" }} disabled value={orderData.EndUse} />
        </Box>
      </Box>

      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          select
          label="Assembly Option"
          fullWidth
          value={assemblyType}
          onChange={(e) => setAssemblyType(e.target.value)}
          required
          // Limit the dropdown menu size
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200, // Max height for dropdown menu
                  width: 250, // Width for dropdown menu
                },
              },
            },
          }}
          aria-hidden="false"
        >
          {assemblyOption.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          select
          label="Machine Number"
          fullWidth
          value={machineNumber}
          onChange={(e) => setMachineNumber(e.target.value)}
          required
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 250,
                },
              },
            },
          }}
          aria-hidden="false"
        >
          {availableMachineNumberOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          select
          label="Needle Type"
          fullWidth
          value={needleType}
          onChange={(e) => setNeedleType(e.target.value)}
          required
          // Limit the dropdown menu size
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200, // Max height for dropdown menu
                  width: 250, // Width for dropdown menu
                },
              },
            },
          }}
          aria-hidden="false"
        >
          {needleOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          type="number"
          label="Number of Stich patterns"
          fullWidth
          value={stichpattern}
          onChange={(e) => setStichPattern(e.target.value)}
          required
          // Limit the dropdown menu size
        ></TextField>
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          select
          label="Employee"
          fullWidth
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          required
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200, // Max height for dropdown menu
                  width: 250, // Width for dropdown menu
                },
              },
            },
          }}
          aria-hidden="false"
        >
          {employees.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: "10%",
          marginTop: "50px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "40%" }}
          onClick={() =>
            handleSubmit(
              assemblyType,
              machineNumber,
              needleType,
              stichpattern,
              employee
            )
          }
        >
          Create Machine Work Load
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "40%" }}
          onClick={() => handleDirectToHome()}
        >
          Order Page
        </Button>
      </Box>
    </PageMain>
  );
}

export default WorkLoad;
