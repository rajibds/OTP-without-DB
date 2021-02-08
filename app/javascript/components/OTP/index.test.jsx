import React from 'react';
import { shallow } from 'enzyme';

import OTP from './index';

describe(OTP, () => {
  const wrapper = shallow(<OTP />);

  it('renders two components', () => {
    expect(wrapper.find('.otp').children().length).toEqual(2);
  });
});
