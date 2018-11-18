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
    this.changeWidth = this.changeWidth.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
  }

  render() {
    const { block } = this.props;
    const options = block.data.options;

    return (
      <div className='image-properties'>
        <div className='prop-row'>
          <Button variant="contained" color="default" type='file' className='select-image' >
            Select Image
            <CloudUploadIcon className='icon' />
            <input type="file" onChange={ this.handleChangeImage } />
          </Button>
        </div>

        <div className='prop-row'>
          <Typography variant="body2" className='label'>Image width</Typography>
          <Slider
            min={0}
            max={600}
            step={1}
            value={options.width}
            aria-labelledby="label"
            className='slider'
            onChange={this.changeWidth}
          />
        </div>

        <div className='prop-row'>
          <Typography variant="body2" className='label'>Image height</Typography>
          <Slider
            min={0}
            max={600}
            step={1}
            value={options.height}
            aria-labelledby="label"
            className='slider'
            onChange={this.changeHeight}
          />
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
    };
    reader.readAsDataURL(file);
  }

  changeWidth(event, value) {
    const { block, dispatch} = this.props;
    dispatch(updateBlockOptions(block, { width: value }));
  }

  changeHeight(event, value){
    const { block, dispatch} = this.props;
    dispatch(updateBlockOptions(block, { height: value }));
  }
}

export default connect()(ImageProperties)