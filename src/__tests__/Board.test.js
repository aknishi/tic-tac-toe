import React from 'react';
import { shallow } from 'enzyme';
import Board from '../Board';

const gridProps = {
  grid: ['', '', '', '', '', '', '', '', '']
}
describe('<Board>', () => {
  it('should render Square', () => {
    const wrapper = shallow(<Board grid={gridProps.grid} />);
    expect(wrapper.find('Square').exists()).toBeTruthy();
  });
  it('should render 9 squares', () => {
    const wrapper = shallow(<Board grid={gridProps.grid} />);
    expect(wrapper.children().length).toEqual(9);
  });

});