import React, { useState } from 'react'
import {AppBar,Avatar,Badge,Box,InputBase,Menu,Toolbar, Typography, styled,MenuItem, Autocomplete, TextField} from '@mui/material'
import{Mail, Pets, Notifications} from '@mui/icons-material'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';


const StyleToolbar= styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between",
    backgroundColor:"white",
})
const Search= styled("div")(({theme})=>({
    backgroundColor:"#f4f6f8",
    padding:"0 10px",
    borderRadius: theme.shape.borderRadius,
    width:"40%"
}))
const Icons= styled(Box)(({theme})=>({
    display:"none",
    alignItems:"center",
    gap:"20px",
    [theme.breakpoints.up("sm")]:{
        display:"flex"
    }
    }));


const NavBar = () => {
    const [open, setOpen]= useState(false)
    const [selectedWidget, setSelectedWidget] = useState(null);

    // Example list of widgets
    const allWidgets = [
      { name: 'Cloud Accounts', description: 'Details about cloud accounts' },
      { name: 'Cloud Account Risk Assessment', description: 'Risk assessment for cloud accounts' },
      { name: 'Namespace Specific Alerts', description: 'Specific alerts per namespace' },
      { name: 'Workload Alerts', description: 'Alerts related to workload' },
      { name: 'Image Risk Assessment', description: 'Assess risks related to images' },
      { name: 'Image Security Issues', description: 'Security issues in images' },
      { name: 'Open Tickets', description: 'Details about open tickets' },
      { name: 'Resolved Tickets', description: 'Details about resolved tickets' },
    ];
  
  return (
    <AppBar position='sticky'>
        <StyleToolbar>
            <Typography variant="h6" color="black" sx={{ display:{ xs:"none" , sm:"block"}}}>
                Deshboard v2
            </Typography>
            {/* <Pets sx={{ display:{   sm:"none"}}}/> */}
            <Autocomplete
        options={allWidgets}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setSelectedWidget(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth sx={{ m: 1, mr:"40vh" }}
            margin="normal"
            placeholder="search anything..."
          />
        )}
      />
            
            <Icons color="#c0c0c0">
                <Badge >
                <Mail />
                </Badge>
                <Badge >
                <NotificationsActiveOutlinedIcon/>
                </Badge>   
            </Icons> 
      </StyleToolbar>
    </AppBar>
  )
}

export default NavBar;
