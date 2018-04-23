import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../redux/actions'
import { withRouter } from 'react-router-dom'
import {geoAlbersUsa, geoMercator, geoOrthographic, geoPath} from "d3-geo"

const mapStateToProps = (state, ownProps) => ({
  state: ownProps.state,
  index: ownProps.index,
  projection: state.projection,
  shouldUpdate: state.update
})

class DrawState extends Component {
  constructor() {
    super()
    this.state = {
      hover: false
    }
  }

  handleMarkerClick() {
    console.log("Clicked a State! ", this.props.state.properties.NAME);
  }

  render() {

    var inputs = {
      stateBoundaries: {
        style: {
          cursor: "default"
        },
        key: `path-${ this.props.index }`,
        d: geoPath().projection(this.props.projection)(this.props.state),
        fill: this.state.hover ? "#7a7a7a" : "#474747", 
        stroke: "#FFFFFF",
        strokeWidth: 0.5, 
        onClick: () => this.handleMarkerClick(), 
        onMouseEnter: () => this.setState({hover: true}),
        onMouseLeave: () => this.setState({hover: false}),
      }
    }

    return (<path {...inputs.stateBoundaries}/> )
  }
}

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawState))