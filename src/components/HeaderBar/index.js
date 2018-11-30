import React, {PureComponent} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

export default class HeaderBar extends PureComponent {

  constructor(props) {
    super(props);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  state = {
    processing: false,
    saved: false,
  };

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
                variant="fab"
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
    this.setState({ loading: true, saved: false });
    console.log('click');
    //const electron = require('electron');
    const { ipcRenderer } = window.require('electron');
    console.log(ipcRenderer);
    //console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

    /*ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg) // prints "pong"
    })*/
    ipcRenderer.send('asynchronous-message', 'ping')

    setTimeout( () => {
      this.setState({ loading: false, saved: true });
    }, 2000)
  }
}