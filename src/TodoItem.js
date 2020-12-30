import React from "react"
import todosData from "./todosData";
import App from"./App"
import "./index.css"

function TodoItem(props){
    const completedStyle = {
      fontStyle: "italic",
      color: "gray",
      textDecoration: "line-through"
    }
    
    
//Calculates difference in days
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDate = new Date();
const secondDate = props.item.dueDate;

const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
todosData.map(item => <App key={item.id} item={item} />)


    return (
        <div className="todo-item">
            <div className="todo-item-layout">
            <div>
                    <span><input onClick = {()=>props.checkedItem()}
                        type="checkbox" 
                        className="checkbox"
                        checked={props.item.completed} 
                        onChange={() => props.handleChange(props.item.id)}
                    /> 
                    </span>
                </div>
                <div>
                    <span style={props.item.completed ? completedStyle: null}> {props.item.text}</span>
                    
                    <br/><span style = {{color:"gray", fontSize:14}}>{diffDays} days left</span>
                
                </div>
            </div>

                
        
                
                
                <button style = {{margin:10, color: "red", border:"transparent", background:"transparent"}} onClick = {()=>props.deleteItem(props.item.id)}
                    >✖</button>
            
            
        </div>
    )
    }

export default TodoItem