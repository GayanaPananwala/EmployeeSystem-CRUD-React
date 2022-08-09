import React from "react";
import './App.css';
import { Button,   Grid, TextField } from "@mui/material";
import axios from "axios";
import EmployeeCard from "./components/EmployeeCard";
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function App() {

  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [country, setCountry] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [wage, setWage] = React.useState(0);

  const [newWage, setNewWage] = React.useState(0);

  const [employeeList, setEmployeeList] = React.useState([]);

  

  //making a post request to send details of employees from front end to back end
  const addEmployee = () => {
    //using axios to send the post request
    axios.post("http://localhost:3001/create", {
      name:name,
      age:age,
      country: country,
      position: position,
      wage:wage,
    }).then(() => {
       setEmployeeList([
        ...employeeList,
        {
          name:name,
          age:age,
          country: country,
          position:position,
          wage:wage,
        }
       ]);
    });
  };

  //Sending the GET request to get data from the API. 
  const getEmployees = () => {
    axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  //Using axios.delete to delete an employee
  const  deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((emp) => {
          return emp.empId != id;
        })
      )
      })
  }

//Using axios.put to send a PUT request to update the data
  const updateEmployeeWage = (id) => {
    axios.put("http://localhost:3001/update", {
      wage: newWage, empId: id
    }).then(
      (response) => {
        setEmployeeList(employeeList.map((val) => {
          return val.empId == id ? {
            empId: val.empId,
            empName: val.empName,
            country: val.country,
            age: val.age,
            position: val.position,
            wage: newWage,
          }
          : val;
        }))
      }
    )
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000066' 
      }
    }
  })

   const classes = {
    field: {
        marginBottom:2,
        marginTop: 2,
        display: 'block'
    },
    addBtn: {
      marginRight: 3
    }

  }

 
  return (
 
    <ThemeProvider theme={theme}>
    <div className="container">
      <h2 className="heading">Employee System</h2>
      

      <form onSubmit={addEmployee}>
        <TextField onChange={(e) => setName(e.target.value)} sx={classes.field} label="Name" variant="filled" fullWidth required />
        <TextField onChange={(e) => setAge(e.target.value)} sx={classes.field} label="Age" type="number" variant="filled" fullWidth required />
        <TextField onChange={(e) => setCountry(e.target.value)} sx={classes.field} label="Country" variant="filled" fullWidth required/>
        <TextField onChange={(e) => setPosition(e.target.value)} sx={classes.field} label="Position" variant="filled" fullWidth required/>
        <TextField onChange={(e) => setWage(e.target.value)} sx={classes.field} label="Wage" variant="filled" type="number" fullWidth required/>
        <Button sx={classes.addBtn} type="submit" variant="contained">Add Employee</Button>
        <Button onClick={getEmployees} type="submit" variant="contained">show Employee</Button>
      
       
      </form>
      <Grid container >
      {employeeList.map((emp) => {
        return(
          <Grid item xs={12} md={6} lg={3} key={emp.empId}>
          <EmployeeCard emp={emp} deleteEmployee={deleteEmployee} updateEmployeeWage={updateEmployeeWage}  setNewWage={setNewWage}/> 
          </Grid>
        )
      })}
      </Grid>
    </div>
    </ThemeProvider>

    
  )
}