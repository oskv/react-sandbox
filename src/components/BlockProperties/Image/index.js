import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from "react-redux";
import { updateBlockOptions } from "../../../actions";

class ImageProperties extends PureComponent {

  constructor(props) {
    super(props);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  render() {
    const { block } = this.props.block;

    return (
      <div className='image-properties'>
        <div className='prop-row'>
          <Button variant="contained" color="default" type='file' className='select-image' >
            Select Image
            <CloudUploadIcon className='icon' />
            <input type="file" onChange={ this.handleChangeImage } />
          </Button>
        </div>
      </div>
    )
  }

  handleChangeImage(event) {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      const { block, dispatch} = this.props;
      dispatch(updateBlockOptions(block, { src: reader.result }))
    }

    reader.readAsDataURL(file);
  }
}

export default connect()(ImageProperties)