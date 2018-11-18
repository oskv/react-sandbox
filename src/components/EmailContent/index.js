import React, {PureComponent} from 'react';
import { connect } from 'react-redux'
import Row from '../Row'
import RowDropTarget from '../RowDropTarget'
import './styles.css'

class EmaiContent extends PureComponent {

  render() {
    const { rows } = this.props;
    const listRows = rows.map((row, i) =>
      <div key={row.hash}>
        <RowDropTarget rowIndex={i} position='before' />
        <Row allowedDropEffect="any"
             index={i}
             id={row.id}
             columns={row.columns}
             name={row.name}
             moveCard={this.moveCard}
        />
        { i === rows.length-1 && <RowDropTarget rowIndex={i} position='after' />}
      </div>
    );
    return (
      <div className="email-content">
        {listRows}
        {!listRows.length && <RowDropTarget rowIndex={0} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rows: state.rows,
});

export default connect(
  mapStateToProps,
)(EmaiContent)