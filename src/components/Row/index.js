import React, { PureComponent } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import Column from '../Column'
import { findDOMNode } from 'react-dom'
import Icon from '@material-ui/core/Icon';
import './styles.css'
import { connect } from "react-redux";
import { moveRow } from '../../actions';

const boxTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null
    }
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = (clientOffset).y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.dispatch(moveRow(dragIndex, hoverIndex));
    monitor.getItem().index = hoverIndex
  }
};

const boxSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
};

class Row extends PureComponent {
  render() {
    const { canDrop, isOver, connectDropTarget, connectDragSource, connectDragPreview, columns, id } = this.props;
    const isActive = canDrop && isOver;
    let className = '';
    const columnsElements = columns.map((column, i) =>
      <Column key={i} width={`${column.width}%`} block={column.block} rowId={id} index={i} />
    );

    if (isActive) {
      className = 'active';
    } else if (canDrop) {
      className = 'can-drop';
    }

    return (
      connectDragPreview &&
      connectDropTarget &&
      connectDragPreview(
        connectDropTarget(
        <div className={`row-wrapper ${className}`}>
          {connectDragSource(<span className='handler'><Icon>swap_vert</Icon></span>)}

          <div className='row-content'>{columnsElements}</div>
        </div>,
      )
    ))
  }
}

const dropTarget =  DropTarget('box', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(Row);

const draggableRow = DragSource('box', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(dropTarget);

export default connect()(draggableRow);