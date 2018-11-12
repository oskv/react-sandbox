import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import CommonProperties from './Common';
import './styles.css'
import { disactivateBlock } from "../../actions";
import {connect} from "react-redux";

class BlockProperties extends PureComponent {
  constructor(props) {
    super(props);
    this.disactivateBlock = this.disactivateBlock.bind(this);
  }

  render() {
    const { block } = this.props;

    return (
      <div className='block-properties'>
        <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <Typography variant="subheading" gutterBottom>Block Properties</Typography>
            </Grid>
          <Grid item>
            <Button color="secondary" aria-label="Cancel" onClick={this.disactivateBlock}>
              <Icon>cancel</Icon>
            </Button>
          </Grid>
        </Grid>

        <CommonProperties block={block}/>


      </div>
    )
  }

  disactivateBlock() {
    const { dispatch } = this.props;
    dispatch(disactivateBlock());
  }
}

export default connect()(BlockProperties);