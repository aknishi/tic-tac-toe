import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import { shallow, mount } from 'enzyme';
import App from '../App';

const wrapper = shallow(<App />)

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
      expect(myApp.state.grid).toEqual(emptyGrid);
    });

    it('should keep track of the current player', () => {
      expect(myApp.state.currentPlayer).toBeTruthy();
    });

    it('should keep a history of moves', () => {
      expect(myApp.state.history).toBeTruthy();
    });
  });

  it('should render Board', () => {
    expect(wrapper.find('Board').exists()).toBeTruthy();
  });

  it('should pass the grid to Board as props', () => {
    const board = wrapper.find('Board');
    expect(board.props().grid).toBeTruthy();
  });

  it('renders prompt message', () => {
    const { getByText } = render(<App />);
    expect(getByText("Player 1's Turn")).toBeInTheDocument();
  });

  describe('Reset button', () => {
    const emptyGrid = ['', '', '', '', '', '', '', '', ''];
    const initialGrid = ['X', 'O', 'X', '', '', '', '', '', '',];

    it('shows a reset button', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('button').first().text()).toEqual('Reset');
    });

    it('reset grids when clicked', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: initialGrid });
      wrapper.update();
      wrapper.find("#reset-btn").simulate("click");
      wrapper.update();
      expect(wrapper.instance().state.grid).toEqual(emptyGrid);
    });
  })

  describe('Undo button', () => {
    const initialHistory = [2, 3, 1, 4];
    const initialGrid = ['', 'X', 'X', 'O', 'O', '', '', '', ''];
    const resultHistory = [2, 3, 1];
    const resultGrid = ['', 'X', 'X', 'O', '', '', '', '', ''];

    it('shows a undo button', () => {
      expect(wrapper.find('button').last().text()).toEqual('Undo')
    });

    it('undoes when clicked', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: initialGrid, history: initialHistory })
      wrapper.update();
      wrapper.find("#undo-btn").simulate("click");
      wrapper.update();
      expect(wrapper.instance().state.grid).toEqual(resultGrid);
      expect(wrapper.instance().state.history).toEqual(resultHistory);
    });
  })


  describe('switchPlayers function', () => {
    it('should switch players when called', () => {
      wrapper.instance().switchPlayers();
      wrapper.update();
      expect(wrapper.instance().state.currentPlayer).toEqual('O')
    });
  });

  describe('addMark function', () => {
    it('should update the grid when called', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().addMark(1);
      wrapper.update();
      expect(wrapper.instance().state.grid[1]).toEqual('X')
    });

    it('should call switch players after being called', () => {
      const wrapper = mount(<App />);
      expect(wrapper.instance().state.currentPlayer).toEqual('X');
      const spy = jest.spyOn(wrapper.instance(), 'switchPlayers');
      wrapper.update();
      wrapper.instance().addMark(1);
      new Promise(
        resolve => setTimeout(() => {
          expect(spy).toHaveBeenCalled()
          expect(wrapper.instance().state.currentPlayer).toEqual('O')
        }, 0)
      )
    });

    it("should not call switch players if there's a winner", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.instance().state.currentPlayer).toEqual('X');
      const spy = jest.spyOn(wrapper.instance(), 'switchPlayers');
      wrapper.update();
      wrapper.instance().addMark(1);
      wrapper.update();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not add a mark if square not empty', () => {
      const wrapper = shallow(<App />);
      jest.spyOn(window, 'alert').mockImplementation(() => { });
      wrapper.instance().addMark(1);
      wrapper.update();
      wrapper.instance().addMark(1);
      wrapper.update();
      expect(wrapper.instance().state.grid[1]).toEqual('X');
      expect(window.alert).toBeCalled();
    });

    it('should add to the move to the history after mark is added ', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().addMark(1);
      wrapper.update();
      expect(wrapper.instance().state.history[0]).toEqual(1)
    });

    it('should check for winner after added mark', () => {
      const wrapper = shallow(<App />);
      wrapper.update();
      const spy = jest.spyOn(wrapper.instance(), 'checkForWinner');
      wrapper.update();
      wrapper.instance().addMark(0);
      wrapper.instance().addMark(3);
      wrapper.instance().addMark(4);
      wrapper.instance().addMark(7);
      wrapper.instance().addMark(8);
      wrapper.update();
      expect(spy).toHaveBeenCalledTimes(5);
      expect(wrapper.instance().state.winner).toEqual('Player1 (X)')
    })

    it("should set to draw if it's the 9th move and there's no winner", () => {
      const initialGrid = ['', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X',];
      const wrapper = mount(<App />);
      const spy = jest.spyOn(wrapper.instance(), 'draw');
      wrapper.update()
      wrapper.instance().setState({ grid: initialGrid, currentPlayer: "X" });
      wrapper.update()
      wrapper.instance().addMark(1);
      wrapper.update();
      setTimeout(() => {
        expect(wrapper.instance().state.message).toEqual("It's a Draw!")
      }, 0)
    })
  })

  describe('reset function', () => {
    const emptyGrid = ['', '', '', '', '', '', '', '', ''];
    const initialGrid = ['X', 'O', 'X', '', '', '', '', '', '',];

    it('should clear all marks from grid', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: initialGrid })
      wrapper.update();
      wrapper.instance().reset();
      wrapper.update();
      expect(wrapper.instance().state.grid).toEqual(emptyGrid);
    });

    it("it switches back to Player1's turn after reset ", () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: initialGrid, currentPlayer: "O" });
      wrapper.update();
      wrapper.instance().reset();
      wrapper.update();
      expect(wrapper.instance().state.currentPlayer).toEqual('X');
    });

    it("it changes message to prompt Player1's turn ", () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: initialGrid, currentPlayer: "O" });
      wrapper.update();
      wrapper.instance().reset();
      wrapper.update();
      expect(wrapper.instance().state.message).toEqual("Player 1's Turn");
    });

    it("it empties the history ", () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ history: [1, 4, 2, 6, 3] });
      wrapper.update();
      wrapper.instance().reset();
      wrapper.update();
      expect(wrapper.instance().state.history).toEqual([]);
    });

    it("it removes the winner", () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ winner: "Player1 (X)" });
      wrapper.update();
      wrapper.instance().reset();
      wrapper.update();
      expect(wrapper.instance().state.winner).toEqual("");
    });
  })

  describe('undo function', () => {
    const initialHistory = [2, 3, 1, 4];
    const initialGrid = ['', 'X', 'X', 'O', 'O', '', '', '', '',];
    const resultHistory = [2, 3, 1];
    const resultGrid = ['', 'X', 'X', 'O', '', '', '', '', '',];

    it('should remove last move from grid and from history', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: initialGrid, history: initialHistory });
      wrapper.update();
      wrapper.instance().undo();
      wrapper.update();
      expect(wrapper.instance().state.grid).toEqual(resultGrid);
      expect(wrapper.instance().state.history).toEqual(resultHistory);
    });

    it("it switches Players turns after undo ", () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({
        grid: initialGrid,
        history: initialHistory,
        currentPlayer: "O",
        message: "Player 2's Turn"
      })
      wrapper.update();
      wrapper.instance().undo();
      wrapper.update();
      expect(wrapper.instance().state.currentPlayer).toEqual('X');
      expect(wrapper.instance().state.message).toEqual("Player 1's Turn");
    });

    it("should not alet when there's nothing to undo", () => {
      const wrapper = shallow(<App />);
      jest.spyOn(window, 'alert').mockImplementation(() => { });
      wrapper.instance().undo(1);
      wrapper.update();
      expect(window.alert).toBeCalled();
    });
  })

  describe('setWinner function', () => {

    it('sets Player 1 as winner if X wins', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setWinner('X');
      wrapper.update();
      expect(wrapper.instance().state.winner).toEqual('Player1 (X)');
      expect(wrapper.instance().state.message).toEqual('Player1 (X) Wins!');
    });

    it('sets Player 2 as winner if O wins', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setWinner('X');
      wrapper.update();
      expect(wrapper.instance().state.winner).toEqual('Player1 (X)');
      expect(wrapper.instance().state.message).toEqual('Player1 (X) Wins!');
    });
  });

  describe('checkForWinner function', () => {
    const rowWinner = ['X', 'X', 'X', 'O', 'O', '', '', '', '',];
    const columnWinner = ['', 'X', 'O', '', 'X', 'O', '', 'X', '',];
    const diagonalWinner = ['', 'O', 'X', 'O', 'X', '', 'X', '', '',];
    const notWinner = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X',];

    it('should find a winner in rows', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: rowWinner });
      wrapper.instance().checkForWinner()
      wrapper.update();
      expect(wrapper.instance().state.winner).toEqual('Player1 (X)');
    });

    it('should find a winner in columns', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: columnWinner });
      wrapper.instance().checkForWinner()
      wrapper.update();
      expect(wrapper.instance().state.winner).toEqual('Player1 (X)');
    });

    it('should find a winner in diagonals', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: diagonalWinner });
      wrapper.instance().checkForWinner()
      wrapper.update();
      expect(wrapper.instance().state.winner).toEqual('Player1 (X)');
    });

    it('should not find a winner in wrong positions', () => {
      const wrapper = mount(<App />);
      wrapper.instance().setState({ grid: notWinner });
      wrapper.instance().checkForWinner()
      wrapper.update();
      expect(wrapper.instance().state.winner).toEqual('');
    });
  });

  describe('draw function', () => {

    it('should end the game to true', () => {
      const wrapper = mount(<App />);
      wrapper.instance().draw()
      wrapper.update()
      expect(wrapper.instance().state.gameEnd).toEqual(true);
    });

    it("should display It's a draw!", () => {
      const wrapper = mount(<App />);
      wrapper.instance().draw()
      wrapper.update()
      expect(wrapper.instance().state.message).toEqual("It's a Draw!");
    });
  });
});

