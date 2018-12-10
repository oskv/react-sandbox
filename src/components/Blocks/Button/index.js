import React, { PureComponent } from 'react'
import './styles.css'
import {connect} from "react-redux";

class Button extends PureComponent {

  render() {
    const { block } = this.props;
    const options = block.data.options;

    return (
      <div className='button-block'>
        <span>{options.title}</span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rows: state.rows,
});

export default connect(mapStateToProps)(Button);