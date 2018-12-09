import React, { PureComponent } from 'react'
import './styles.css'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { connect } from "react-redux";
import { updateBlockOptions } from "../../../actions";

const toolbarButtons = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'colorPicker', 'textAlign', 'link'],
};

class Text extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`<p>${props.block.data.options.text}</p>`)
        )
      ),
    };
    this.oldText = `<p>${props.block.data.options.text}</p>\n`;
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  render() {

    return (
      <div className='text-block'>
        <Editor
          defaultEditorState={this.state.editorState}
          toolbarClassName="demo-toolbar-absolute"
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbarOnFocus
          toolbar={toolbarButtons}
          onEditorStateChange={this.onEditorStateChange}
          />
      </div>
    )
  }

  onEditorStateChange(data) {
    const { block, dispatch} = this.props;
    const newText = draftToHtml(convertToRaw(data.getCurrentContent()));
    console.log('this.oldText', this.oldText);
    if (this.oldText !== newText){
      dispatch(updateBlockOptions(block, { text: newText }));
      this.oldText = newText;
    }

  }
}

export default connect()(Text)