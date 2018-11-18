import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import { connect } from "react-redux";
import { updateBlockStyles } from "../../../actions";

class CommonBlockProperties extends PureComponent {

  constructor(props) {
    super(props);
    this.changeMargin = this.changeMargin.bind(this);
  }

  render() {
    const { styles } = this.props.block;

    return (
      <div className='common-properties'>
        <Typography variant="body2" className='label'>Padding</Typography>
        <Slider
          min={0}
          max={30}
          step={1}
          value={styles.padding}
          aria-labelledby="label"
          className='slider'
          onChange={this.changeMargin}
        />
      </div>
    )
  }

  changeMargin(event, value) {
    const { block, dispatch} = this.props;
    dispatch(updateBlockStyles(block, { padding: value }))
  }
}

export default connect()(CommonBlockProperties)