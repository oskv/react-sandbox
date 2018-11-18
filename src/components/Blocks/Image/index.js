import React, { PureComponent } from 'react'
import { connect } from "react-redux";

class Image extends PureComponent {
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

const mapStateToProps = state => ({
  rows: state.rows,
});

export default connect(mapStateToProps)(Image);