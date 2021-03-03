import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

import Generate from './Generate';
import { mockStore, runWithAsyncHandling } from '../../../../__tests__/testHelpers';

const email = 'test.email';
const otpGenerateResponse = { email, encrypted_hash: 'abcxyz' };
const otpSentText = 'Please check your email for OTP';

const props = { store: mockStore({ user: { email } }), populateUser: jest.fn() };
const wrapper = mount(<Generate {...props} />);

describe('Generate', () => {
  test('it renders an email field', () => {
    expect(wrapper.find('label').text()).toEqual('Translation: email');
  });

  test('it sends an otp to the given email after clicking on the submit button', async () => {
    axios.onGet(`/otps/generate.json?email=${email}`).reply(200, otpGenerateResponse);
    wrapper.find('input').simulate('change', { target: { value: email } });

    await runWithAsyncHandling(wrapper, () => {
      wrapper.find('form').simulate('submit', { preventDefault() {} });
    });
    expect(wrapper.find('.alert').text()).toEqual(otpSentText);
  });
});
