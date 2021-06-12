import React, { Component } from "react";
import queryString from "query-string";
import http from "./httpService";

class Home extends Component{
    state= { 
        data: {},
    };
    
    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        queryParams.page = queryParams.page ? queryParams.page : "1";
        let searchStr = this.makeSearchString(queryParams);
        let response = await http.get(`?${searchStr}`);
        console.log(response);
        let { data } = response;
        this.setState({ data: data});
    }
    
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props)
            this.fetchData();
    }

    handlePage = (incr) => {
        let queryParams = queryString.parse(this.props.location.search);
        let page = this.state.data.page;
        let newPage = page + incr;
        queryParams.page = newPage;
        this.callURL(`/users`, queryParams);
    };

    callURL = (url, options) => {
        let searchString = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchString,
        });
    };

    makeSearchString = (options) => {
        let { page } = options;
        let searchStr = "";
        searchStr  = this.addToQueryString(searchStr, "page", page);
        return searchStr;
    };

    addToQueryString = (str, paramName, paramValue) => 
        paramValue 
            ? str 
                ? `${str}&${paramName}=${paramValue}`
                : `${paramName}=${paramValue}`
            : str;

    render(){
        const { page, per_page, total_pages, data = [], total } = this.state.data;
        let startIndex = per_page === 6 ? (page - 1) * per_page : (page - 1) * 6;
        let endIndex = page < total_pages
            ? startIndex + per_page - 1
            : total - 1;
        
        return (
            <div className="container">
                Showing Users from {startIndex + 1} to {endIndex + 1} of {total} Users
                <div className="row border text-center font-weight-bold py-2">
                    <div className="col-md-2">Id</div>
                    <div className="col-md-3">Email</div>
                    <div className="col-md-2">First Name</div>
                    <div className="col-md-2">Last Name</div>
                    <div className="col-md-3">Avatar</div>
                </div>
                {data.map((pr) => (
                    <div className="row border text-center" key={pr.id}>
                        <div className="col-md-2">{pr.id}</div>
                        <div className="col-md-3">{pr.email}</div>
                        <div className="col-md-2">{pr.first_name}</div>
                        <div className="col-md-2">{pr.first_name}</div>
                        <div className="col-md-3">
                            <img src={pr.avatar} alt="avatar" />
                        </div>
                    </div>
                ))}
                <div className="row">
                    <div className="col-2">
                        {startIndex > 1 ? 
                            <button className="btn btn-secondary" onClick={() => this.handlePage(-1)}>Previous</button> 
                        : ""}
                    </div>
                    <div className="col-8"></div>
                    <div className="col-2 text-right">
                        {endIndex < total - 1 ? 
                            <button className="btn btn-secondary" onClick={() => this.handlePage(1)}>Next</button> 
                        : ""}
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;