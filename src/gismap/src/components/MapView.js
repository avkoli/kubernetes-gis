import React, { PureComponent } from 'react';
import { GeoJSON, MapContainer, TileLayer, WMSTileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import axios from 'axios';
import hash from 'object-hash';

const GEOSERVER = process.env.REACT_APP_GEOSERVER;

const REQUEST_PARAMS = {
    outputFormat: 'application/json',
    maxFeatures: 250,
    request: 'GetFeature',
    service: 'WFS',
    typeName: 'tiger:poly_landmarks',
    version: '1.0.0'
};

class MapView extends PureComponent {
	constructor() {
        super();
        this.map = null;
        this.state = {
            center: [40.7590403, -74.0392709],
            data: null,
            zoom: 13
        }; 
    }

    componentDidMount() {
		axios.get(GEOSERVER, { params: REQUEST_PARAMS, headers:  {'Access-Control-Allow-Origin': '*'}})
            .then(({ data }) => {
				this.setState({ data });
				console.log(data);
				this.forceUpdate();
			})
            .catch(error => {
				console.log(error);
			});
    }

	handleWhenReady(evt) {
		console.log('whenready');
	}

	handleWhenCreated(evt) {
		console.log('whencreated');
	}

    render() {
        const {
            center,
            data,
            zoom
        } = this.state;

        return(
            <MapContainer
				style={{ height: "100vh" }}
                center={center}
                zoom={zoom}
				whenReady={this.handleWhenReady}
				whenCreated={this.handleWhenCreated}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

				<WMSTileLayer
					attribution='&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a> | MADE WITH ♥ BY ABHIJEET KOLI'
					url="https://services.sentinel-hub.com/ogc/wms/bb04787f-36b9-4ed2-81a8-eaecbb6938b2"
					maxcc="20" 
					preset={this.props.preset} 
					layers={this.props.preset} 
					time="2021-02-01/2021-08-29"
					key={hash(this.props)}
				/>
            </MapContainer>
        )
    }
}

export default MapView;