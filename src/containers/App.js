import React from "react";
import CardList from "../component/CardList";
import SearchBox from "../component/SearchBox";
import Scroll from "../component/Scroll";
import ErrorBoudry from "../component/ErrorBoudry";
import { Component } from "react/cjs/react.production.min";
import './App.css';
import ErrorBoundry from "../component/ErrorBoudry";


class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response =>response.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event)=>{
        this.setState({ searchfield: event.target.value})
        
    }


    render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })


    if(!this.state.robots){
        return <h1>loading</h1>
    } else{
    return(
        <div className="tc">
            <h1 className="f1">Robo Friends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundry><CardList robots={filteredRobots}/></ErrorBoundry>
            </Scroll>
        </div>
        );
    }
    }
}
export default App;