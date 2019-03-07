import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';

describe('<App>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('initial state', () => {
    const myApp = shallow(<App />).instance();
    const emptyGrid = ['', '', '', '', '', '', '', '', ''];

    it('should be initialized with grid of nine empty spaces', () => {
      expect(myApp.state.grid).toEqual(emptyGrid)
    });
    it('should keep track of the current player', () => {
      expect(myApp.state.currentPlayer).toBeTruthy()
    });
  });

  it('should render Board', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Board').exists()).toBeTruthy();
  });

  it('should pass the grid to Board as props', () => {
    const wrapper = shallow(<App />);
    const board = wrapper.find('Board')
    expect(board.props().grid).toBeTruthy()
  });
  it("should prompt for Player's turn", () => {
    const wrapper = shallow(<App />);
    const message = wrapper.find('Message');
    expect(message).toBeTruthy()
    expect(message.children().text()).toBe("Player 1's Turn")
  })
});
