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
  push,
  onValue,
  query,
  orderByChild,
  equalTo,
  set,
} from "firebase/database"; // Adjust the path as necessary
import { projectFirestore } from "../../components/firebase-config";
function OrderDetails() {
  const { ordernumber } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  }, []);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderRef = ref(projectFirestore, `/Orders`);
    const queryRef = query(
      orderRef,
      orderByChild("OrderNumber"),
      equalTo(ordernumber)
    );
    try {
      // Listen to the query to get the specific order key
      onValue(queryRef, async (snapshot) => {
        if (snapshot.exists()) {
          // Get the key of the first matching order
          const orderKey = Object.keys(snapshot.val())[0];
          const specificOrderRef = ref(projectFirestore, `/Orders/${orderKey}`);

          // Update the order's "Started" field
          await set(specificOrderRef, {
            ...snapshot.val()[orderKey], // Keep the existing fields
            Started: "true", // Update or add the "Started" field
          });

          alert("Order Started Successfully!");
          navigate(`/grafanadashboard/${ordernumber}`); // Set the success message
        } else {
          alert("Order not found!");
        }
      });
    } catch (error) {
      // Handle the error (you can show an error message to the user)
      console.error("Error Starting Order:", error.message);
    }
  };
  return (
    <PageMain>
      {console.log("order data new", orderData)}
      <Typography
        Heading
        sx={{
          lineHeight: 1,
          fontWeight: "500",
          fontSize: "1.625rem",
          fontFamily: "poppins",
        }}
      >
        Order Page
      </Typography>
      <form onSubmit={handleSubmit}>
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
          <TextField value={orderData.OrderNumber} sx={{ width: "70%" }} />
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
          <TextField sx={{ width: "70%" }} value={orderData.StartDate} />
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
          <TextField sx={{ width: "70%" }} value={orderData.EndDate} />
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
          <TextField sx={{ width: "70%" }} value={orderData.NumberOfUnits} />
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
          <TextField sx={{ width: "70%" }} value={orderData.MachineNumber} />
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
          <TextField sx={{ width: "70%" }} value={orderData.EndUse} />
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
          <TextField sx={{ width: "70%" }} value={orderData.FabricMethod} />
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
              <TextField sx={{ width: "70%" }} value={orderData.FiberContent} />
            </Box>
          ))}
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
          <TextField sx={{ width: "70%" }} value={orderData.NeedleType} />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "30%", marginLeft: "40%" }}
        >
          Start Order
        </Button>
      </form>
    </PageMain>
  );
}

export default OrderDetails;
