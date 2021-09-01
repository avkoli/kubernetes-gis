import React from 'react';
import { requestAuthToken } from '@sentinel-hub/sentinelhub-js';

export default class AuthToken extends React.Component {
  
  async componentDidMount() {
	if (this.props.tokenShouldBeUpdated) {
		const clientId = process.env.REACT_APP_CLIENT_ID;
  		const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
		const authToken =  await requestAuthToken(clientId, clientSecret);
        this.props.setToken(authToken);
      };
  }

  render(props) {
    return null;
  }
}
