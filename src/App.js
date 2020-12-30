import React from "react"
import TodoItem from "./TodoItem"
import todosData from "./todosData"
import Dialog from "./Dialog"
import "./index.css"



class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos:todosData, rating:"", ratings:"", 
                period:0, day:Date, rank:"", num:"", opened:false, opens:false, open:false, show:true
        }
        this.handleChange = this.handleChange.bind(this)
        this.whenChange = this.whenChange.bind(this)
        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.checkedItem=this.checkedItem.bind(this)
        this.rankIt=this.rankIt.bind(this)

    }
    
    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }

    //method for removing list item
    deleteItem (id){
    
      this.setState(preState => {
        const updatedList = preState.todos.filter(todo => todo.id !== id)
        for (let j=0; j<updatedList.length; j++){
          updatedList[j].id = j
        }
        return{todos: updatedList}
      })//Pop up appears for feedback
       this.setState({opened:true})
       setTimeout(()=>{
       this.setState({opened:false})},3300)
    }
      //Pop up appears when an item is checked
    checkedItem(){
        this.setState({open:true})
       setTimeout(()=>{
       this.setState({open:false})},3300)
    }
   
    whenChange(event) {
    const {name, value, type, checked} = event.target
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

        
 
    //method for adding list item
    addItem(e){
        
        this.setState({show:!this.state.show})
        //assign values to each states, so that they can be compared when they are ranked
        var len = this.state.todos.length+1
        let importance= 0
        if (this.state.ratings === "low"){
            importance = 1
        }else if(this.state.ratings === "neutral"){
            importance = 2
        }else {
            importance = 3
        }
   
        
        if (this.input.value !== "" ){
            var newItem = {text: this.input.value, id:len, 
                        completed:false, impOfComp:importance, 
                        timeReq:this.state.period, 
                        dueDate:Date.parse(this.state.day)}
        
        this.setState((prevState) => {
            return{
                todos: prevState.todos.concat(newItem)
            }
        })
       }
        
    this.input.value = ""
        e.preventDefault()


      
      //Ranks items
        
        if (this.rank.value === "complete"){
            this.state.todos.sort(function(a,b){
                return b.impOfComp - a.impOfComp
            })
        }else if(this.rank.value === "timely"){
            this.state.todos.sort(function(a,b){
                return b.impOfTimely - a.impOfTimely
            })
        }else if(this.rank.value === "timeReq"){
            this.state.todos.sort(function(a,b){
                return b.timeReq - a.timeReq
            })
        }else{
            this.state.todos.sort(function(a,b){
                return a.dueDate - b.dueDate
            })
        }

        this.setState({opens:true})
        setTimeout(()=>{
        this.setState({opens:false})},3300) 
}

rankIt(e) {
    e.preventDefault();
    if (this.rank.value === "complete"){
        this.state.todos.sort(function(a,b){
            return b.impOfComp - a.impOfComp
        })
    }else if(this.rank.value === "timeReq"){
        this.state.todos.sort(function(a,b){
            return b.timeReq - a.timeReq
        })
    }else{
        this.state.todos.sort(function(a,b){
            return b.dueDate - a.dueDate
        })
    }

    this.setState({opens:true})
    setTimeout(()=>{
    this.setState({opens:false})},0) 
}

    
    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} 
            item={item} handleChange={this.handleChange} deleteItem={this.deleteItem} 
            isOpen={this.isOpen} checkedItem = {this.checkedItem} date ={item.dueDate}/>)

        const items = this.state.todos.filter(item=>{
            if(item.completed === false){
                return item
            }
        })
        const itemCompleted = this.state.todos.filter(item=>{
            if(item.completed === true){
                return item 
            }
        })
        //The form
        return (
            
            <div className="todo-list">
                <h3>DO THINGS SMARTER!</h3>
                 <div className="form-design">
              {
                  
                  this.state.show? <div> 
                <form id= "testForm" onSubmit = {this.addItem}>
                    
                  <label>
                      <p>
                      <input  className="enter-form" ref = {(a) => this.input = a} 
                          type = "text"
                          placeholder ="Enter item" /> 
                      </p>
                   </label> 
                  <p className="layout">
                  <label><span style={{textDecoration:"underline"}}>Priority level</span><br/>
                      <label>
                      <input ref = {(a) => this.rated = a} 
                          type = "radio"  
                          name="rating" 
                          value="low" 
                          checked={this.state.rating === "low"}
                          onChange={this.whenChange} /> low
                      </label>
                      <label>
                      <input ref = {(a) => this.rated = a} 
                          type = "radio"  
                          name="rating" 
                          value="neutral" 
                          checked={this.state.rating === "neutral"}
                          onChange={this.whenChange} /> neutral
                      </label>
                      <label>
                      <input ref = {(a) => this.rated = a} 
                          type = "radio"  
                          name="rating"
                          value="high" 
                          checked={this.state.rating === "high"}
                          onChange={this.whenChange} /> high
                      </label>
                  </label>
                      
                  <label>Days required
                        
                      <input className="enter-form days-req-length" ref = {(a) => this.period = a} 
                             type = "number"
                             name="period" 
                             value = {this.state.period}
                             onChange={this.whenChange}
                             placeholder ="Days required to finish" style={{maxWidth:"30px"}}/> 
                      <span>&emsp;</span>
                      </label>
                      <label>Due date
                          <input className="enter-form days-req-length" ref = {(a) => this.day = a} 
                              name="day"
                              value={this.state.day}
                              onChange={this.whenChange}
                              type = "date" style={{maxWidth:"100px"}}/>
                      </label>
                  </p>
              
                  <button className="add-task-bt" type="submit" id="add-task"> Add item </button> <br/>                       
              </form>
              <br/>
          
              </div> : <button className="btn-rank btn-len" onClick={()=>{this.setState({show:!this.state.show})}}>Add a new task</button>
              }
              <form id="form2" onSubmit = {this.addItem}>
                      <select className="enter-form"
                      ref = {(a) => this.rank = a}
                      value={this.state.rank} 
                      name="rank" 
                      onChange={this.whenChange}
                      
                  >
                      <option value="">-- Arrange by --</option>
                      <option value="complete">Importance of completion</option>
                      <option value="timely">Importance of timely completion</option>
                      <option value="timeReq">time required to accomplish</option>
                      <option value="daysLeft">Days left</option>
                      
                  </select> <span>&emsp;</span>
                  <br/>
              <button className="btn-rank" type="submit" onClick={this.rankIt}>Arrange</button>
              </form>
              
          </div>
               
        {/*Dialog that pops up*/}
        <p className="comment">

        <span style={{color: "red"}}>{itemCompleted.length}</span> items done. You have <span style={{color: "red"}}>{items.length}</span> items left 💪
               
        </p>
    
               
                
               
                {todoItems}
            </div>
        )    
    }
}

export default App