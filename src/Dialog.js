import React, {Component} from "react"



class Dialog extends Component{
    
    
    render(){
        
   
        const dialogBox= {width:"300px",
        maxWidth: "100%",
        margin: "0 auto",
        position: "fixed",
        left:"50%",
        top:"50%",
        transform: "translate(-50%, -50%)",
        zIndex: "999",
        backgroundColor: "#eee",
        padding: "10px 20px 40px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column"}

        const yesButton= {
            marginButton:"15px",
            padding:"3px 8px",
            cursor:"pointer",
            borderRadius:"50%",
            border:"none",
            width:"30%",
            fontWeight:"bold",
            alignSelf:"flex-end"

        }
        const cancelButton = {
            marginButton:"30px",
            padding:"3px 3px",
            cursor:"pointer",
            borderRadius:"50%",
            border:"none",
            width:"30%",
            height:"10%",
            fontWeight:"bold",
            alignSelf:"flex-end"

            
        }
        
        let dialog = (
            <div style = {dialogBox}>
             <div>{this.props.children}</div>
            </div>
        )
    

        

        
        if (!this.props.isOpen & !this.props.nowOpen & !this.props.itOpen){
            dialog = null
        }
        return(
            <div>
                {dialog}
            </div>
        )
            }
        }
            
        
    



export default Dialog