import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from "react-redux";
import { updateBlockStyles } from "../../../actions";
import Input from '@material-ui/core/Input';

class ImageProperties extends PureComponent {

  constructor(props) {
    super(props);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  render() {
    const { styles } = this.props.block;

    return (
      <div className='image-properties'>
        <div className='prop-row'>


          <Input
            type='file' label='Upload'
            inputRef={(ref) => console.log(ref.value)}
          />


          <Button variant="contained" color="default" type='file'>
            Upload Image
            <CloudUploadIcon />
            <input type="file" onChange={ this.handleChangeImage } />
          </Button>
        </div>

        <div className='prop-row'>
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
      </div>
    )
  }

  handleChangeImage(event, value) {
    console.log(value);
    console.log(this.fileUpload);
    console.log(event);
    //const { block, dispatch} = this.props;
    //dispatch(updateBlockStyles(block, { padding: value }))
  }
}

export default connect()(ImageProperties)