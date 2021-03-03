import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

import Verify from './Verify';
import { mockStore, runWithAsyncHandling } from '../../../../__tests__/testHelpers';

const email = 'test.email';
const encryptedHash = 'encrypted_hash';
const successfulVerificationResponse = { message: 'OTP verification successful' };
const failedVerificationResponse = { message: 'OTP did not match' };

describe('Verify', () => {
  const props = { store: mockStore({ user: { email: '', encryptedHash } }) };
  const wrapper = mount(<Verify {...props} />);

  test('it renders an OTP field', () => {
    expect(wrapper.find('label').text()).toEqual('Translation: verification');
  });

  test('OTP input field is disabled if email is empty', () => {
    expect(wrapper.find('input').prop('disabled')).toEqual(true);
  });

  test('OTP input field is enabled if email is not empty', () => {
    const props = { store: mockStore({ user: { email, encryptedHash } }) };
    const wrapper = mount(<Verify {...props} />);

    expect(wrapper.find('input').prop('disabled')).toEqual(false);
  });

  test('it shows a successful message if otp verification is successful', async () => {
    const props = { store: mockStore({ user: { email, encryptedHash } }) };
    const wrapper = mount(<Verify {...props} />);
    const otp = '12345';
    axios
      .onGet(`/otps/verify.json?email=${email}&otp=${otp}&encrypted_hash=${encryptedHash}`)
      .reply(200, successfulVerificationResponse);

    wrapper.find('input').simulate('change', { target: { value: otp } });

    await runWithAsyncHandling(wrapper, () => {
      wrapper.find('form').simulate('submit', { preventDefault() {} });
    });
    expect(wrapper.find('.alert').text()).toEqual(successfulVerificationResponse.message);
  });

  test('it shows a error message if otp verification is not successful', async () => {
    const props = { store: mockStore({ user: { email, encryptedHash } }) };
    const wrapper = mount(<Verify {...props} />);
    const otp = '12345';
    axios
      .onGet(`/otps/verify.json?email=${email}&otp=${otp}&encrypted_hash=${encryptedHash}`)
      .reply(500, failedVerificationResponse);

    wrapper.find('input').simulate('change', { target: { value: otp } });

    await runWithAsyncHandling(wrapper, () => {
      wrapper.find('form').simulate('submit', { preventDefault() {} });
    });
    expect(wrapper.find('.alert').text()).toEqual(failedVerificationResponse.message);
  });
});
