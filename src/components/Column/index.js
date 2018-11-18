import React, { PureComponent } from 'react'
import { DropTarget } from 'react-dnd'
import './styles.css';
import BlockWrapper from '../Blocks/BlockWrapper'
import {connect} from "react-redux";
import { addBlock } from '../../actions'

const blockTarget = {
  drop({ dispatch, index, rowId }, monitor) {
    const blockTemplateData = monitor.getItem();
    dispatch(addBlock({ columnIndex: index, rowId, blockTemplateData }));
  },
};

class Column extends PureComponent {
  render() {
    const { canDrop, isOver, connectDropTarget, width, block } = this.props;
    const isActive = canDrop && isOver;
    let className = '';

    if (isActive) {
      className = 'active';
    } else if (canDrop) {
      className = 'can-drop';
    }

    return (
      <div className='column' style={{ width }}>
        { block && <BlockWrapper block={block} /> }

        {!block && connectDropTarget &&
          connectDropTarget(
            <div className={`column-drop-target ${className}`}>
              <span>Drag a content here</span>
            </div>,
          )
        }
      </div>
    )
  }
}

const columnDropTarget = DropTarget('column', blockTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(Column);

export default connect()(columnDropTarget);
