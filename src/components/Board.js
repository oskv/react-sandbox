import React, {PureComponent} from 'react';
import Square from './Square'

export default class Board extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleSquareClick = (i) => {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({ squares, xIsNext: !this.state.xIsNext })
  };

  renderSquare(i) {
    return (
      <Square
        value = { this.state.squares[i] }
        onClick = { this.handleSquareClick.bind(this, i)}/>
    )
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
      </div>
    );
  }
}