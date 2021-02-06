import React, { useState } from 'react';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

const OTP = () => {
  const [inputString, setInputString] = useState('');

  const handleFormSubmission = async event => {
    event.preventDefault();

    const { data } = await httpClient.get(routes.otps.generate({ email: inputString }));
    console.log({ data });
  };

  return (
    <form onSubmit={event => handleFormSubmission(event)}>
      <div className="form-row">
        <div className="col">
          <label htmlFor="inputString">{I18n.t('email')}</label>
          <input
            className="form-control"
            id="inputString"
            onChange={event => setInputString(event.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="inputString">{I18n.t('verification')}</label>
          <input
            className="form-control"
            id="inputString"
            onChange={event => setInputString(event.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="col">
          <button type="submit" className="btn btn-primary btn-sm">
            {I18n.t('request_otp')}
          </button>
        </div>

        <div className="col">
          <button type="submit" className="btn btn-primary btn-sm">
            {I18n.t('verify_otp')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OTP;
