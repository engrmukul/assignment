import React, { Component } from "react";
import PropertyDataService from "../services/property.service";

export default class Property extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getProperty = this.getProperty.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);

    this.state = {
      currentProperty: {
        id: null,
        title: "",
        description: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProperty(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProperty: {
          ...prevState.currentProperty,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentProperty: {
        ...prevState.currentProperty,
        description: description
      }
    }));
  }

  getProperty(id) {
    PropertyDataService.get(id)
      .then(response => {
        this.setState({
          currentProperty: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProperty() {
    PropertyDataService.update(
      this.state.currentProperty.id,
      this.state.currentProperty
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The property was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProperty() {    
    PropertyDataService.delete(this.state.currentProperty.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/properties')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProperty } = this.state;

    return (
      <div>
        {currentProperty ? (
          <div className="edit-form">
            <h4>Property</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProperty.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProperty.description}
                  onChange={this.onChangeDescription}
                />
              </div>
             
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProperty}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProperty}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Property...</p>
          </div>
        )}
      </div>
    );
  }
}
