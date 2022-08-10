import {  CardHeader } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Card  from "@mui/material/Card";
import UpdateIcon from '@mui/icons-material/Update';
import { Button,  IconButton, Avatar } from "@mui/material";
export default function EmployeeCard(props){

    const classes = {
        card: {
            marginBottom:2,
            marginTop: 2,
            width: 300,
            height:360
        },
        avatar: {
            backgroundColor: "#000"
        }

    
      }

        return(
            <div>
             <Card sx={classes.card}>
                <CardHeader 
                className="cardHeading"
                avatar = { 
                    <Avatar sx={classes.avatar}>{props.emp.empName[0].toUpperCase()}</Avatar>
                }
                action={
                    <IconButton onClick={() => {
                        props.deleteEmployee(props.emp.empId);
                    }} >
                            <DeleteIcon />
                    </IconButton>

                } />
            
            <div className="details">
                <b><p>Name: {props.emp.empName}</p></b>
                <p>Age: {props.emp.age}</p>
                <p>Country: {props.emp.country}</p>
                <p>Position: {props.emp.position}</p>
                <p>wage: {props.emp.wage}</p>
                <input
                className="inputText"
                  type="number"
                  placeholder="0000..."
                  onChange={(e) => props.setNewWage(e.target.value)}
                 
                />
                <Button 
                onClick={() => {
                    console.log(props.emp.empId)
                    props.updateEmployeeWage(props.emp.empId);
                   
                }}
                  className="updateBtn"
                >
                  <UpdateIcon/>
                  Update
                </Button>
            </div>
            
            </Card>
            </div>
        )
}