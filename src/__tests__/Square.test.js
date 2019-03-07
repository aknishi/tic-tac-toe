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

  it("should not be clickable if there the game is over", () => {
    const wrapper = mount(<App />);
    jest.spyOn(window, 'alert').mockImplementation(() => { });
    wrapper.instance().setState({ gameEnd: true })
    const mySquare = wrapper.find('Square').first()
    mySquare.simulate('click');
    expect(window.alert).toBeCalled();
    expect(mySquare.children().text()).toBe("")
  });

});