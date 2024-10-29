import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import PageMain from "../../components/PageMain";
import {
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  set,
} from "firebase/database"; // Adjust the path as necessary
import { projectFirestore } from "../../components/firebase-config";

function WorkloadOverview() {
  const { ordernumber, documentid } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [mainorderData, setMainOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderKeyDoc, setOrderKey] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const orderRef = ref(projectFirestore, `/Orders`);
    const queryRef = query(
      orderRef,
      orderByChild("OrderNumber"),
      equalTo(ordernumber)
    );

    try {
      // Listen to the query to get the specific order key
      onValue(
        queryRef,
        async (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const order = Object.values(data)[0];
            const orderKey = Object.keys(data)[0];

            console.log("Order Key:", orderKey); // Debugging line

            const specificAssemblyOrder = order.assemblyOrders[documentid];

            if (specificAssemblyOrder) {
              // Update the "Started" field to true
              const specificOrderRef = ref(
                projectFirestore,
                `/Orders/${orderKey}/assemblyOrders/${documentid}`
              );

              await set(specificOrderRef, {
                ...specificAssemblyOrder, // Keep the existing fields
                Started: "true", // Update or add the "Started" field
              });

              alert("Order Started Successfully!");
              // Navigate to the real-time dashboard after starting the order
              navigate(
                `/realTimeDashboard/${orderKey}/${documentid}/${ordernumber}`
              );
            } else {
              alert("Assembly order not found!");
            }
          } else {
            alert("Order not found!");
          }
          setLoading(false);
        },
        (error) => {
          setError("Error fetching data");
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error Starting Order:", error.message);
      setLoading(false); // Ensure loading state is cleared in case of error
    }
  };

  const handleDirectToHome = () => {
    navigate(`/OrderDetails/${ordernumber}`);
  };
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
            const orderKey = Object.keys(data)[0];
            setOrderKey(orderKey); // Set the order key
            setMainOrderData(order);
            setOrderData(order.assemblyOrders[documentid]);
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
  }, [ordernumber, documentid]);

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

  //   const handleButtonClick = (ordernumberNavigate) => {
  //     navigate("/Createworkload", { state: ordernumberNavigate }); // Navigate to Services page
  //   };

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
        Machine WorkLoad
      </Typography>
      <form>
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
          <TextField value={ordernumber} disabled sx={{ width: "70%" }} />
        </Box>
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
            Number of Units
          </Typography>
          <TextField
            value={mainorderData.NumberOfUnits}
            disabled
            sx={{ width: "70%" }}
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
          <TextField
            value={mainorderData.EndUse}
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
            Machine Number
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            disabled
            value={orderData.machineNumber}
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
            Assembly Type
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            disabled
            value={orderData.assemblyType}
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
            Needle Type
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            disabled
            value={orderData.needleType}
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
            Stich patterns
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            disabled
            value={orderData.stitchPattern}
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
            Employee
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            disabled
            value={orderData.employee}
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
        <Box
          sx={{
            margin: "20px",
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
            onClick={(event) => {
              if (orderData?.Started === "true") {
                window.location.href = `/realTimeDashboard/${orderKeyDoc}/${documentid}/${ordernumber}`; // Navigate to specific order page
              } else if (orderData?.Started === "false") {
                window.location.href = `/needledashboard/${orderKeyDoc}/${documentid}/${ordernumber}`; // Navigate to needle dashboard
              } else {
                handleSubmit(event); // Pass event to handleSubmit when order is not started
              }
            }}
            sx={{ width: "30%" }}
          >
            {orderData?.Started === "true"
              ? "Go To Order" // Label for active order
              : orderData?.Started === "false"
              ? "Order Completed" // Label for completed order
              : "Start Order"}{" "}
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
      </form>
    </PageMain>
  );
}

export default WorkloadOverview;
