import React from 'react';
import { shallow } from 'enzyme';
import Board from '../Board';

describe('<Board>', () => {
  it('should render Square', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('Square').exists()).toBeTruthy();
  });
});