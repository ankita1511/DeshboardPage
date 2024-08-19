import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Delete, Sync, Close } from "@material-ui/icons";
import { initialCategories } from "./Categories";
import RiskAssessmentPieChart from "./RiskAssessmentPieChart";
import { MoreVert, WatchLater, KeyboardArrowDown } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  AppBar,
} from "@mui/material";

function Dashboard() {
  const [categories, setCategories] = useState(initialCategories);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedWidgets, setSelectedWidgets] = useState({
    cspm: [],
    cwpp: [],
    image: [],
    ticket: [],
  });
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");

  const widgetsData = {
    cspm: ["Cloud Accounts", "Cloud Account Risk Assessment"],
    cwpp: ["Namespace Specific Alerts", "Workload Alerts"],
    image: ["Image Risk Assessment", "Image Security Issues"],
    ticket: ["Open Tickets", "Resolved Tickets"],
  };

  const toggleAddWidget = () => {
    setShowAddWidget(!showAddWidget);
  };
  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCheckboxChange = (category, widget) => {
    setSelectedWidgets((prevState) => {
      const newSelection = prevState[category].includes(widget)
        ? prevState[category].filter((item) => item !== widget)
        : [...prevState[category], widget];
      return { ...prevState, [category]: newSelection };
    });
  };

  const renderCheckboxes = (category) => {
    return widgetsData[category].map((widget) => (
      <Paper
        key={widget}
        elevation={2} // Adjust elevation for shadow depth
        sx={{
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "2px",
          border: "1px solid #ccc",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedWidgets[category].includes(widget)}
              onChange={() => handleCheckboxChange(category, widget)}
            />
          }
          label={widget}
        />
      </Paper>
    ));
  };
  const handleAddWidget = () => {
    const category =
      selectedTab === 0
        ? "cspm"
        : selectedTab === 1
        ? "cwpp"
        : selectedTab === 2
        ? "image"
        : "ticket";

    const newWidget = `${newWidgetName}: ${newWidgetText}`;
    widgetsData[category].push(newWidget);

    setSelectedWidgets((prevState) => ({
      ...prevState,
      [category]: [...prevState[category], newWidget],
    }));

    setNewWidgetName("");
    setNewWidgetText("");
  };

  const addWidget = (categoryName) => {
    const widgetName = prompt("Enter Widget Name");
    const widgetText = prompt("Enter Widget Text");
    const newWidget = {
      id: Date.now().toString(),
      name: widgetName,
      text: widgetText,
    };

    const updatedCategories = categories.map((category) => {
      if (category.name === categoryName) {
        return { ...category, widgets: [...category.widgets, newWidget] };
      }
      return category;
    });

    setCategories(updatedCategories);
  };

  const removeWidget = (categoryName, widgetId) => {
    const updatedCategories = categories.map((category) => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return category;
    });

    setCategories(updatedCategories);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h6" marginTop={1}>
        CNAPP Dashboard
      </Typography>
      <Stack direction="row" spacing={2} sx={{ ml: "125vh", mt: "-25px" }}>
        {" "}
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "#808072",
            width: "150px",
          }}
          onClick={toggleAddWidget}
        >
          Add Widget <Add />
        </Button>
        {showAddWidget && (
          <Dialog
            open={showAddWidget}
            onClose={toggleAddWidget}
            fullWidth
            maxWidth={false}
            sx={{
              "& .MuiDialog-paper": {
                width: "50%",
                height: "100%",
                position: "absolute",
                right: 0,
                margin: 0,
                maxWidth: "none",
              },
            }}
          >
            {" "}
            <AppBar sx={{ position: "relative", bgcolor: "#03045e" }}>
              <Stack direction="row">
                <DialogTitle sx={{ mr: "25vh", mt: "-5px" }}>
                  Add Widget
                </DialogTitle>
                <IconButton
                  sx={{ ml: "50vh", mt: "-5px" }}
                  color="inherit"
                  onClick={toggleAddWidget}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
              </Stack>
            </AppBar>
            <Typography sx={{ ml: "20px", mt: "10px" }}>
              Personalise your deshboard by adding the following widget
            </Typography>
            <DialogContent>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="widget categories"
              >
                <Tab label="CSPM" />
                <Tab label="CWPP" />
                <Tab label="Image" />
                <Tab label="Ticket" />
              </Tabs>
              <FormGroup>
                {selectedTab === 0 && renderCheckboxes("cspm")}
                {selectedTab === 1 && renderCheckboxes("cwpp")}
                {selectedTab === 2 && renderCheckboxes("image")}
                {selectedTab === 3 && renderCheckboxes("ticket")}
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleAddWidget}>Cancel</Button>
              <Button
                onClick={toggleAddWidget}
                variant="contained"
                sx={{ bgcolor: "#03045e" }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "#808072",
            width: "50px",
          }}
        >
          <Sync />
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "#808072",
            width: "50px",
          }}
        >
          <MoreVert />
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "#808072",
            width: "170px",
          }}
        >
          <WatchLater />
          Last 2 day <KeyboardArrowDown />
        </Button>
      </Stack>
      {categories.map((category) => (
        <div key={category.name}>
          <Typography variant="h6" mt={2} gutterBottom>
            {category.name}
          </Typography>
          <Grid container spacing={6}>
            {category.widgets.map((widget) => (
              <Grid item xs={12} sm={8} md={4} key={widget.id}>
                <Paper style={{ padding: "20px", position: "relative" }}>
                  <IconButton
                    style={{ position: "absolute", top: 10, right: 10 }}
                    size="small"
                    onClick={() => removeWidget(category.name, widget.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                  <Typography variant="h6">{widget.name}</Typography>
                  <Typography variant="body2">{widget.text}</Typography>
                  <RiskAssessmentPieChart />
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                style={{
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 300,
                }}
              >
                <Button
                  startIcon={<Add />}
                  onClick={() => addWidget(category.name)}
                >
                  Add Widget
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;


