import React, { Component } from 'react'

var tasks=[];
var str="";

class Tasklist extends Component {
    constructor(props) {
        super(props)
        this.state = {
             taskst: [],
             txtFromInput: "",
             valueFromHidden: 0,
             txtFromChange: "",
             editMode: 0
        }
    }
    changeTxtFromInput=(event)=>{
        this.setState({
            txtFromInput: event.target.value
        });
    }

    newName=(event)=>{
        this.setState({
            txtFromChange: event.target.value
        });
    }
    changeTaskName=(event)=>{
        if(this.state.txtFromChange!=""){
            let k=event.currentTarget.id;
            let pattern="^change([0-9]*)$";
            let arrm=k.match(pattern);
            tasks.find(item=>item.id==arrm[1]).editmode=0;
            tasks.find(item=>item.id==arrm[1]).name=this.state.txtFromChange;
            this.setState({
                taskst: tasks,
                txtFromChange: ""
            }) 
        }
    }
    complete=(event)=>{
        let k=event.currentTarget.id;
        
        let pattern="^button([0-9]*)$";
        let arrm=k.match(pattern);
        let t=tasks.find(item=>item.id==arrm[1]).completed;
        if(t==1){
            tasks.find(item=>item.id==arrm[1]).completed=0;
            event.currentTarget.innerHTML="Complete Task";
        }
        else{
            
            tasks.find(item=>item.id==arrm[1]).completed=1;
            event.currentTarget.innerHTML="Task Completed";
        }
        this.setState({
            taskst: tasks
        })
    };
    deleteTask=(event)=>{
        let k=event.currentTarget.id;
        let pattern="^delete([0-9]*)$";
        let arrm=k.match(pattern);
        let ind=tasks.findIndex(item=>item.id==arrm[1])
        tasks.splice(ind, 1);
        this.setState({
            taskst: tasks
        })
    };
    editTask=(event)=>{
        let k=event.currentTarget.id;
        
        let pattern="^edit([0-9]*)$";
        let arrm=k.match(pattern);
        tasks.find(item=>item.id==arrm[1]).editmode=1;
        this.setState({
            taskst: tasks
        })
    }
    addNewTask(){
        if(this.state.txtFromInput!=""){
          tasks.push({"name": this.state.txtFromInput,
                  "id":this.state.valueFromHidden,
                  "completed":0,
                "editmode": 0}); 
            this.setState({
                strst: str,
                taskst: tasks,
                txtFromInput: "",
                valueFromHidden: this.state.valueFromHidden+1 
            }) 
            console.log(tasks);
        }
    }
  
    render() {
        return (
            <div>
             <input type="hidden" id="counter"  value={this.state.valueFromHidden}></input>
             {this.state.taskst.map(elem => 
             <div key={elem.id}>
                 <p>{elem.name}</p>
                 <button id={"button"+elem.id} onClick={this.complete} style={{backgroundColor: elem.completed ? 'lightgreen' : 'lightgrey'}}>Complete Task</button>
                 <button id={"edit"+elem.id} onClick={this.editTask}>Edit Task</button>
                 <button id={"delete"+elem.id} onClick={this.deleteTask}>Remove Task</button> 
                 <input type="text" id={"changedname"+elem.id} value={this.state.txtFromChange} style={{display: elem.editmode ? 'inline' : 'none'}} onChange={this.newName}></input>
                 <button id={"change"+elem.id} style={{display: elem.editmode ? 'inline' : 'none'}} onClick={this.changeTaskName}>Change Task</button><br /></div>)}
       <br />
      <input type="text" id="newtaskname" value={this.state.txtFromInput} onChange={this.changeTxtFromInput}></input>
      <button id="add" onClick={this.addNewTask.bind(this)}>Add new Task</button>
        </div>
        )
    }
}

export default Tasklist