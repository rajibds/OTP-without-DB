import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

const VerifyOTP = ({ user }) => {
  const [inputString, setInputString] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmission = async event => {
    event.preventDefault();

    try {
      const { data } = await httpClient.get(
        routes.otps.verify({
          email: user.email,
          otp: inputString,
          encrypted_hash: user.encryptedHash,
        }),
      );

      console.log({ data });
      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={event => handleFormSubmission(event)}>
      <div className="form-group">
        <label htmlFor="inputString">{I18n.t('verification')}</label>
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
        {I18n.t('verify_otp')}
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

VerifyOTP.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    encryptedHash: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(VerifyOTP);
