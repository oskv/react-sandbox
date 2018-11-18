import React, { PureComponent } from 'react'
import Text from '../Text';
import Image from '../Image';
import './styles.css'
import { connect } from "react-redux";
import { setActiveBlock } from "../../../actions";

class BlockWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  render() {
    const { block } = this.props;
    const isActive = this.props.activeBlock.id === this.props.block.id;
    const className = isActive ? 'active' : '';
    return (
      <div className={`block-wrapper ${className}`} onClick={this.select} style={block.styles}>
        { block.type === 'text' && <Text block={block} />}
        { block.type === 'image' && <Image block={block} />}
      </div>
    )
  }

  select() {
    const { block, dispatch } = this.props;
    dispatch(setActiveBlock(block));
  }
}

const mapStateToProps = state => ({
  activeBlock: state.activeBlock,
});

export default connect(mapStateToProps)(BlockWrapper);