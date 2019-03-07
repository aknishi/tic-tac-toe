import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import { shallow, mount } from 'enzyme';
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

  it('renders prompt message', () => {
    const { getByText } = render(<App />);
    expect(getByText("Player 1's Turn")).toBeInTheDocument();
  });

  describe('switchPlayers', () => {
    it('should switch players when called', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().switchPlayers()
      wrapper.update()
      expect(wrapper.instance().state.currentPlayer).toEqual('O')
    });
  });

  describe('addMark', () => {
    it('should update the grid when called', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().addMark(1)
      wrapper.update()
      expect(wrapper.instance().state.grid[1]).toEqual('X')
    });

    it('should call switch players after being called', () => {
      const wrapper = mount(<App />);
      expect(wrapper.instance().state.currentPlayer).toEqual('X')
      const spy = jest.spyOn(wrapper.instance(), 'switchPlayers');
      wrapper.update();
      wrapper.instance().addMark(1)
      wrapper.update()
      expect(spy).toHaveBeenCalled();
      expect(wrapper.instance().state.currentPlayer).toEqual('O')
    });

    it('should not add a mark if square not empty', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().addMark(1)
      wrapper.update()
      wrapper.instance().addMark(1)
      wrapper.update()
      expect(wrapper.instance().state.grid[1]).toEqual('X')
    });
  })


});
