import React, { Component } from "react";
import PropertyDataService from "../services/property.service";
import { Link } from "react-router-dom";

export default class PropertiesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveProperties = this.retrieveProperties.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProperties = this.setActiveProperties.bind(this);
        this.removeAllProperties = this.removeAllProperties.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            properties: [],
            currentProperty: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveProperties();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveProperties() {
        PropertyDataService.getAll()
            .then(response => {
                this.setState({
                    properties: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveProperties();
        this.setState({
            currentProperty: null,
            currentIndex: -1
        });
    }

    setActiveProperties(property, index) {
        this.setState({
            currentProperty: property,
            currentIndex: index
        });
    }

    removeAllProperties() {
        PropertyDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        this.setState({
            currentProperty: null,
            currentIndex: -1
        });

        PropertyDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    properties: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, properties, currentProperty, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Properties List</h4>

                    <ul className="list-group">
                        {properties &&
                            properties.map((property, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveProperties(property, index)}
                                    key={index}
                                >
                                    {property.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllProperties}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentProperty ? (
                        <div>
                            <h4>Property</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentProperty.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentProperty.description}
                            </div>

                            <Link
                                to={"/properties/" + currentProperty.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Property...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
