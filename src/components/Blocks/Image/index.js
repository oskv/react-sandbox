import React, { PureComponent } from 'react'

export default class Image extends PureComponent {
  render() {
    const { block } = this.props;
    const options = block.data.options;
    const src = options.src;
    const styles = {
      width: options.width,
      height: options.height,
    };

    return (
      <img src={src} style={styles} alt='img-block' />
    )
  }
}