import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { addRow as addRowAction } from '../../actions'
import './styles.css'

const boxTarget = {
  drop({ dispatch, rowIndex, position }, monitor) {
    dispatch(addRowAction(rowIndex, position, monitor.getItem().templateData));
  },
};

class RowDropTarget extends PureComponent {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    let className = '';

    if (isActive) {
      className = 'active';
    } else if (canDrop) {
      className = 'can-drop';
    }

    return (
      connectDropTarget &&
      connectDropTarget(
        <div className={`row-drop-target ${className}`} />,
      )
    )
  }
}

const droppedTarget = DropTarget('row-drop-target', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(RowDropTarget);

export default connect()(droppedTarget);