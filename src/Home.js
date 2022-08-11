import React from "react";
import './App.scss';
import {  Grid, TextField } from "@mui/material";
import axios from "axios";
import EmployeeCard from "./components/EmployeeCard";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom";

export default function Home() {

  //useHistory hook can be used to access the history instance used by react router.
  const history = useHistory();

  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [country, setCountry] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [wage, setWage] = React.useState(0);
  const [isOpened, setIsOpened] = React.useState(true);
  const [error, setError] = React.useState({
    nameError: false,
    ageError: false,
    countryError: false,
    positionError: false,
    wageError: false
  })


  const [newWage, setNewWage] = React.useState(0);

  const [employeeList, setEmployeeList] = React.useState([]);




  const addEmployee = (e) => {
    e.preventDefault()

  
    setError(prev => {
      return{ ...prev, nameError: false,
        ageError: false,
        countryError: false,
        positionError: false,
        wageError: false}
    })

    if (name === "") {
      setError(prev => {
          return{ ...prev,  nameError: true}
        })
    }
    if(country === "") {
        setError(prev => {
            return{ ...prev,  countryError: true}
          })
    }

    if(position === "") {
      setError(prev => {
          return{ ...prev,  positionError: true}
        })
  }

  if(age === 0) {
    setError(prev => {
        return{ ...prev,  ageError: true}
      })
   
}

    if(wage === 0) {
      setError(prev => {
          return{ ...prev,  wageError: true}
        })
      
    }
    


    if(name && age && country && position && wage ){
      (alert("Successfully Added!"));
       //making a post request to send details of employees from front end to back end
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
      },
      history.push('/'));
    }
    

}
   



  //Sending the GET request to get data from the API. 
  const getEmployees = () => {
    setIsOpened(prev => !prev)
    if(isOpened){
       axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
    }
   
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
    },
    typography: {
      fontFamily: "Quicksand"
      
    }
  })

   const classes = {
    field: {
        marginBottom:2,
        marginTop: 2,
        display: 'block'
        
    }
  }

 
  return (
 
    <ThemeProvider theme={theme}>
    <div className="container">
      <h1 className="heading">Employee System</h1>
      

      <form noValidate>
        <TextField error={error.nameError} sx={classes.field} onChange={(e) => setName(e.target.value)}  label="Name" variant="outlined" fullWidth required />
        <TextField error={error.ageError} sx={classes.field} onChange={(e) => setAge(e.target.value)}  label="Age" type="number" variant="outlined" fullWidth required />
        <TextField error={error.countryError} sx={classes.field} onChange={(e) => setCountry(e.target.value)}  label="Country" variant="outlined" fullWidth required/>
        <TextField error={error.positionError} sx={classes.field} onChange={(e) => setPosition(e.target.value)}  label="Position" variant="outlined" fullWidth required/>
        <TextField error={error.wageError} sx={classes.field} onChange={(e) => setWage(e.target.value)} label="Wage" variant="outlined" type="number" fullWidth required/>
      
        <div className="btn">
        <button onClick={addEmployee}  type="submit">Add Employee</button>
        </div>
      </form>
        

        <div className="btn">
          <button className="showBtn" onClick={getEmployees} type="submit" >{isOpened ? "Show Employees" : "Hide Employees"}</button>
        </div>
      
      <div className="grid" style= {isOpened ? { display:'none'} : {display: 'block'}}>
        <Grid container spacing={2} >
      {employeeList.map((emp) => {
        return(
          <Grid item xs={12} sm={6} md={3}  key={emp.empId}>
          <EmployeeCard emp={emp} deleteEmployee={deleteEmployee} updateEmployeeWage={updateEmployeeWage}  setNewWage={setNewWage}/> 
          </Grid>
        )
      })}
      </Grid>
      </div>
      
    </div>
    </ThemeProvider>

    
  )
}