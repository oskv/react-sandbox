import React, {PureComponent} from 'react';
import BlockTemplate from '../BlockTemplate';
import Grid from '@material-ui/core/Grid';
import './styles.css'

export default class RowTemplatesList extends PureComponent {
  constructor(props) {
    super(props);
    this.blocks = [
      { type: 'text', icon: 'text_format', data: { text: 'Input some text here'} },
      { type: 'image', icon: 'image', data: { src: '/images/image-icon-png.png', width: 100, height: 100} },
      { type: 'button', icon: 'insert_link'},
      { type: 'divider', icon: 'vertical_align_center'},
    ];
  }

  render() {
    const listRows = this.blocks.map((block, i) =>
      <Grid item key={i} xs={6}>
        <BlockTemplate type={block.type} icon={block.icon} options={block.data} />
      </Grid>
    );
    return (
      <Grid container className='block-templates-list' justify='flex-start' spacing={24}>
        {listRows}
      </Grid>
    );
  }
}