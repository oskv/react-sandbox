import React, { PureComponent } from 'react'
import './styles.css'

export default class Button extends PureComponent {

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