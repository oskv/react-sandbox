import React, {PureComponent} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux'

class HeaderBar extends PureComponent {

  constructor(props) {
    console.log(props);
    super(props);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  state = {
    processing: false,
    saved: false,
  };

  componentDidMount() {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.on('back-success-saved', (event, arg) => {
        console.log('save:success', arg);
        this.setState({ loading: false, saved: true });
        setTimeout(() => {
          this.setState({ loading: false, saved: false });
        }, 5000);
      });

      ipcRenderer.on('back-save-error', (event, error) => {
        console.log('save:error', error) // prints "pong"
      });

      ipcRenderer.on('back-save-started', (event, error) => {
        this.setState({ loading: true, saved: false });
        console.log('save:error', error) // prints "pong"
      });
    }
  }

  render() {
    const { loading, saved } = this.state;
    const buttonClass = saved ? 'saved' : '';
    return (
      <AppBar className="main-app-bar">
        <Toolbar className='main-app-bar-toolbar'>
          <Icon className="logo-icon">email</Icon>
          <Typography variant="headline" color="inherit">
            Email editor
          </Typography>
          <div className={`save-buttons-wrapper ${buttonClass}`}>
              <Button
                mini
                color="primary"
                className='button-save'
                onClick={this.handleSaveClick}
              >
                { saved ? <CheckIcon className='' /> : <SaveIcon />}
              </Button>
              {loading && <CircularProgress size={46} className='loader' />}
          </div>
        </Toolbar>
      </AppBar>
    );
  }

  handleSaveClick() {
    console.log(this.props.rows);
    const emailHtml = generateHtml(this.props.rows);
    console.log(emailHtml);
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      console.log(ipcRenderer);
      ipcRenderer.send('web-save-started', emailHtml);
    }
  }
}

function mapStateToProps(state) {
  return { rows: state.rows };
}

export default connect(mapStateToProps)(HeaderBar);


function generateHtml(rows) {
  let rowsContent = '';
  rows.forEach((row) =>  {
    rowsContent += '\n' + generateRow(row);
  });
  const tabelTag = `<table>${rowsContent}\n</table>`;
  return tabelTag;
}

function generateRow(row) {
  let columns = '';
  row.columns.forEach(column => columns += '\n' + generateColumn(column));
  return `\t<tr>\n ${columns} \n</tr>`
}

function generateColumn(column) {
  let styles = { width: column.width };
  const blockHtml = (column.block && generateBlock(column.block)) || '';
  if (column.block) {
    styles = Object.assign({ ...styles }, column.block.styles);
  }
  return `\t\t<td style="${generateColumnStyles(styles)}">${blockHtml}</td>`
}

function generateColumnStyles(styles) {
  let stylesStr = `width: ${styles.width}%;`;
  if (styles.padding) {
    stylesStr += ` padding: ${styles.padding}px;`;
  }
  return stylesStr;
}

function generateBlock(block) {
  let blockHtml = '';
  console.log(block.type);
  switch (block.type) {
    case 'image':
      blockHtml = generateImage(block);
      break;
    case 'text':
      blockHtml = block.data.options.text;
      break;
    case 'divider':
      blockHtml = generateDivider(block);
      break;
    case 'button':
      blockHtml = generateButton(block);
      break;
    default:
      blockHtml = '';
  }
  return blockHtml;
}

function generateImage(block) {
  const options = block.data.options;
  const imageHtml = `\n\t\t\t<img src="${options.src}" width="${options.width}px" height="${options.height}px" />`;
  return imageHtml;
}

function generateDivider() {
  return "<p style='width: 100%; height: 1px; background: black;'></p>";
}

function generateButton(block) {
  const options = block.data.options;
  const styles = 'padding: 5px 10px; border: 1px solid black; border-radius: 5px; display: inline-block';
  return `<a href='${options.link}' style='${styles}'>${options.title}</a>`;
}