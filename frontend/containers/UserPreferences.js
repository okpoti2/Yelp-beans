import axios from 'axios';
import React, { Component } from 'react';

import UserPreferenceForm from '../components/UserPreferenceForm';

class UserPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: [
        {
          id: 'None',
          location: 'Unknown',
          title: 'No Meetings Set Up',
          timezone: 'America/Los_Angeles',
          size: 0,
          office: 'None',
          datetime: [],
        },
      ],
      email: '',
    };
  }

  componentDidMount() {
    axios.get('/email').then((res) => {
      axios.get(`/v1/user/preferences/?email=${res.data.email}`).then(
        (res2) => {
          this.setState({ preferences: res2.data, email: res.data.email });
        },
      );
    });
  }

  render() {
    const { preferences, email } = this.state;
    return (
      <div className="preferences">
        <UserPreferenceForm preferences={preferences} email={email} />
      </div>
    );
  }
}

export default UserPreferences;
