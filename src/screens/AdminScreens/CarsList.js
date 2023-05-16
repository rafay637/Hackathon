import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ScreenHeader from "../../components/screenheader";
import DeleteIcon from "@mui/icons-material/Delete";
import MyIconbutton from "../../components/Iconbutton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { fbDelete, fbGet, fbPost } from "../../config/firebasemethods";
import MySwitch from "../../components/Switch";

const CarsList = () => {
  const [CarsList, setCarsList] = useState([]);
  const [singleObj, setSingleObj] = useState({});

  const [Cridentials, setCridentitals] = useState([]);
  const navigate = useNavigate();

  let openDetail = (obj) => {
    navigate("/admin/SingleInstitute", { state: obj });
  };

  let openEdit = (obj) => {
    navigate("/admin/AddCars", { state: obj });
  };

  let openForm = () => {
    navigate("/admin/AddCars");
  };

  let DeleteItem = (obj) => {
    console.log(obj);
    fbDelete("ListedCarsList", obj.id)
      .then(() => {
        console.log("data Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let getCridentitals = () => {
    fbGet("institute")
      .then((res) => {
        setCridentitals([...res]);
        console.log("inst cridentials", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let DeleteCridentials = (obj) => {
    const obj1 = Cridentials.filter((x) => {
      return x.password === obj.password;
    });
    console.log("matched obj : ", obj1[0].id);
    fbDelete("institute", obj1[0].id)
      .then(() => {
        console.log("cridentials Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const save = () => {
    fbGet("AvailableCars")
      .then((res) => {
        console.log("Data retrieved SuccessFully !");
        setCarsList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sent = (x) => {
    fbPost("ListedCarsList", x, x.id)
      .then(() => {
        console.log(
          "data sent Successfully ! new institute list should be with active_inActive",
          x
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    save();
  }, []);
  console.log("List : ",CarsList);

  const handleActiveInactiveToggle = (index) => {
    const updatedCarsList = CarsList.map((inst, i) =>
      i === index ? { ...inst, availibility: !inst.availibility } : inst
    );
    setCarsList(updatedCarsList);
  };
  return (
    <>
      <ScreenHeader
        title="CarsList List"
        buttonsList={[
          {
            displayField: (
              <MyIconbutton
                onClick={() => openForm()}
                val={<AddCircleOutlineIcon />}
                variant="contained"
              />
            ),
          },
        ]}
      />
      <Box className="d-flex row mt-4 justify-content-between p-3 align-items-center">
        {CarsList && Array.isArray(CarsList) && CarsList.length > 0
          ? CarsList.map((x, i) => (
              <Paper
                key={i}
                className="p-2 my-2 border"
                onClick={() => openDetail(x)}
              >
                <Grid container>
                  <Grid item md={2}>
                    <Box className="m-2 p-2 text-center">
                      <img
                        src={x.carImg}
                        alt={x.car}
                        width={100}
                        height={100}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={2} variant="h5">
                    <Box className="mt-4 p-2">
                      <Typography
                        sx={{ fontSize: 12 }}
                        className="fw-bold text-muted"
                      >
                        Car Name
                      </Typography>
                      <Typography>{x.car}</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2} variant="h5">
                    <Box className="mt-4 p-2">
                      <Typography
                        sx={{ fontSize: 12 }}
                        className="fw-bold text-muted"
                      >
                        Car Model
                      </Typography>
                      <Typography>{x.car_model}</Typography>
                    </Box>
                  </Grid>

                  <Grid item md={2}>
                    <Box className="mt-4  align-middle p-2">
                      <Typography
                        sx={{ fontSize: 12 }}
                        className="fw-bold text-muted"
                      >
                        Availibility / NotAvailable
                      </Typography>

                      <Typography>
                        <FiberManualRecordIcon
                          color={x.availibility ? "error" : ""}
                        />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2}>
                    <Box className="mt-4 align-middle p-2">
                      <Typography
                        sx={{ fontSize: 12 }}
                        className="fw-bold text-muted"
                      >
                        Toggle Availibility Activation
                      </Typography>

                      <MySwitch
                        checked={CarsList.availibility}
                        handleChangeonClick={(e) => {
                          e.stopPropagation();
                          handleActiveInactiveToggle(i);
                          sent(x);
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={1}>
                    <Box className="mt-4">
                      <MyIconbutton
                        val={<DeleteIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          DeleteItem(x);
                          DeleteCridentials(x);
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={1}>
                    <Box className="mt-4">
                      <MyIconbutton
                        val={<EditIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(x);
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))
          : null}
      </Box>
    </>
  );
};

export default CarsList;
