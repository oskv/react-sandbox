import React, { PureComponent } from 'react'
import './styles.css'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const toolbarButtons = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'colorPicker', 'textAlign', 'link'],
};

export default class Text extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`<p>${props.block.data.options.text}</p>`)
        )
      ),
    }
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
    console.log(draftToHtml(convertToRaw(data.getCurrentContent())));
  }
}