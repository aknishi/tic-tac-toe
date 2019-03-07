import React from 'react';
import { shallow } from 'enzyme';
import Board from '../Board';

describe('<Board>', () => {
  it('should render Square', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('Square').exists()).toBeTruthy();
  });
  it('should render 9 squares', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.children().length).toEqual(9);
  });
});