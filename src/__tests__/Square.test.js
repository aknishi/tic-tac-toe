import React from 'react';
import { shallow, mount } from 'enzyme';
import Square from '../Square';
import App from '../App';

const squareProps = {
  mark: "X",
  id: 1,
}
describe('<Square>', () => {
  it("should add current player's mark when clicked", () => {
    const wrapper = mount(<App />);
    const mySquare = wrapper.find('Square').first()
    mySquare.simulate('click');
    expect(mySquare.children().text()).toBe("X")
  });

});