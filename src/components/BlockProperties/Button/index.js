import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { updateBlockOptions } from "../../../actions";

class ButtonProperties extends PureComponent {

  constructor(props) {
    super(props);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  render() {
    const { block } = this.props;
    const options = block.data.options;

    return (
      <div className='button-properties'>
        <div className='prop-row'>
          <TextField
            id="standard-name"
            label="Link"
            value={options.link}
            onChange={this.handleChangeLink}
            fullWidth
            margin="normal"
          />
        </div>

        <div className='prop-row'>
          <TextField
            id="standard-name"
            label="Title"
            value={options.title}
            onChange={this.handleChangeTitle}
            fullWidth
            margin="normal"
          />
        </div>

      </div>
    )
  }

  handleChangeLink(event) {
    const { block, dispatch} = this.props;
    dispatch(updateBlockOptions(block, { link: event.target.value }));
  }

  handleChangeTitle(event) {
    const { block, dispatch} = this.props;
    dispatch(updateBlockOptions(block, { title: event.target.value }));
  }
}

export default connect()(ButtonProperties)