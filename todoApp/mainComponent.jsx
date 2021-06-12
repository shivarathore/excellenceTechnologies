import React, { Component } from "react";

class MainComponent extends Component{
    state = {
        todoArr: [],
        todo: "",
    };

    handleChange = (e) =>{
        const { currentTarget: input } = e;
        let s1 = {...this.state};
        s1[input.name] = input.value;
        this.setState(s1);
    };

    addtodo = () => {
        let s1 = {...this.state};
        s1.todoArr.push(s1.todo);
        s1.todo = "";
        this.setState(s1);
    };

    done = (item) => {
        let s1 = {...this.state};
        let index = s1.todoArr.findIndex(val => val === item);
        s1.todoArr.splice(index, 1);
        this.setState(s1);
    };

    render(){   
        const { todo, todoArr } = this.state;

        return (
            <div className="container">
                <h3 className="text-center">TO DO App</h3>
                <div className="row mt-5">
                    <div className="col-2"></div>
                    <div className="form-group col-6">
                        <input type="text" className="form-control" name="todo" value={todo} 
                        placeholder="Enter to do work" onChange={this.handleChange} />
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary" onClick={() => this.addtodo()}>Add todo</button>
                    </div>
                </div>
                {todoArr.length === 0 ? "" : <h4>To Do List</h4>}
                {todoArr.map((item) => (
                    <div className="row" key={item}>
                        <div className="col-2 border">
                            <button className="btn btn-success btn-sm my-2" onClick={() => this.done(item)}>Done</button>
                        </div>
                        <div className="col-10 pt-2 border">{item}</div>
                    </div>
                ))}
            </div>
        );
    }
}
export default MainComponent;