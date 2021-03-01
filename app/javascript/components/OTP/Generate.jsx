import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { populateUser } from '../../actions/user';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

const GenerateOTP = ({ populateUser }) => {
  const [inputString, setInputString] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmission = async event => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const { data } = await httpClient.get(routes.otps.generate({ email: inputString }));
      populateUser(data);
      setSuccessMessage('Please check your email for OTP');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={event => handleFormSubmission(event)}>
      <div className="form-group">
        <label htmlFor="inputString">{I18n.t('email')}</label>
        <input
          className="form-control"
          id="inputString"
          onChange={event => setInputString(event.target.value)}
        />
        {successMessage && (
          <div className="alert alert-success py-1" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger py-1" role="alert">
            {errorMessage}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-sm">
        {I18n.t('request_otp')}
      </button>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  populateUser: data => dispatch(populateUser(data)),
});

GenerateOTP.propTypes = {
  populateUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GenerateOTP);
