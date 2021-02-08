import React from 'react';
import { Provider } from 'react-redux';
import store from '../../containers/store';
import GenerateOTP from './Generate';
import VerifyOTP from './Verify';

const OTP = () => (
  <Provider store={store}>
    <React.StrictMode>
      <div className="otp row">
        <div className="col-sm">
          <GenerateOTP />
        </div>
        <div className="col-sm">
          <VerifyOTP />
        </div>
      </div>
    </React.StrictMode>
  </Provider>
);

export default OTP;
