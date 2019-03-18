import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import moment from 'moment';
import dot from '../assets/dot.png';

import Grid from '@material-ui/core/Grid';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import EOGCard from './EOGCard';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={4} defaultCenter={{ lat: props.lat, lng: props.lng }}>
      {props.isMarkerShown
        ? props.data.map((point, index) => (
            <Marker
              key={index}
              icon={{ url: dot, scaledSize: { width: 32, height: 32 } }}
              opacity={(index + 0.001) / props.data.length}
              position={{ lat: point.latitude, lng: point.longitude }}
            />
          ))
        : null}

      {props.isMarkerShown ? <Marker position={{ lat: props.lat, lng: props.lng }} /> : null}
    </GoogleMap>
  ))
);

class DroneData extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { items } = this.props;
    let getTime = x => {
      return moment(x.timestamp).format('hh:mm a');
    };
    return (
      <Grid container spacing={24} style={{ padding: 10, marginTop: 50 }}>
        <Grid item xs={7}>
          {items.data ? (
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCdfXzjkN8tcTqF7A-3-mxCAH3WwcD_HxQ&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              lat={items.data[items.data.length - 1].latitude}
              lng={items.data[items.data.length - 1].longitude}
              data={items.data}
            />
          ) : null}
        </Grid>
        <Grid item xs={5}>
          <EOGCard
            title={'Drone Temperature'}
            content={
              <LineChart
                width={500}
                height={300}
                data={items.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getTime} />
                <YAxis
                  domain={[201, 350]}
                  label={{ value: 'Temperature (F)', position: 'insideLeft', angle: -90, dy: -10 }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="metric" stroke="#82ca9d" />
              </LineChart>
            }
          />
        </Grid>
      </Grid>
    );
  }
}

const mapState = (state, ownProps) => {
  const { isFetching, items, error, isPolling } = state.drone;
  return {
    isFetching,
    items,
    error,
    isPolling
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.START_POLLING
    })
});

export default connect(
  mapState,
  mapDispatch
)(DroneData);
