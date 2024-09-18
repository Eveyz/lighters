import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import initialValue from './value.json';
import { BoldMark, ItalicMark, UnderlinedMark, BlockquoteBlock, UlBlock, H1Block, H2Block, LiBlock, OlBlock } from './Marks';
import { Toolbar, ToolbarButton, ToolbarIcon } from './Toolbar';

const DEFAULT_NODE = 'paragraph'

class SlateEditor extends React.Component {
  state = {
    value: Value.fromJSON(initialValue),
  }

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  ref = editor => {
    this.editor = editor
  }

  onChange = ({value}) => {
    this.setState({value});
  }

  onKeyDown = (e, editor, next) => {
    if (!e.ctrlKey) return next()
    let mark;
    switch (e.key) {
      case 'b': {
        mark = 'bold';
        break;
      }
      case 'i': {
        mark = 'italic';
        break;
      }
      case 'u': {
        mark = 'underlined';
        break;
      }
      default: {
        return next()
      }
    }
    e.preventDefault();
    editor.toggleMark(mark);
  }

  render() {
    return (
      <div>
        <Toolbar>
          {this.renderMarkButton('bold', 'format_bold')}
          {this.renderMarkButton('italic', 'format_italic')}
          {this.renderMarkButton('underlined', 'format_underlined')}
          {this.renderBlockButton('heading-one', 'looks_one')}
          {this.renderBlockButton('heading-two', 'looks_two')}
          {this.renderBlockButton('block-quote', 'format_quote')}
          {this.renderBlockButton('numbered-list', 'format_list_numbered')}
          {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
        </Toolbar>
        <Editor 
          autoFocus
          ref={this.ref}
          className="slate-editor r-box-shadow"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
        />
      </div>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)

    return (
      <ToolbarButton
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <ToolbarIcon>{icon}</ToolbarIcon>
      </ToolbarButton>
    )
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.state

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <ToolbarButton
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <ToolbarIcon>{icon}</ToolbarIcon>
      </ToolbarButton>
    )
  }

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <BlockquoteBlock {...props} />
      case 'bulleted-list':
        return <UlBlock {...props} />
      case 'heading-one':
        return <H1Block {...props} />
      case 'heading-two':
        return <H2Block {...props} />
      case 'list-item':
        return <LiBlock {...props} />
      case 'numbered-list':
        return <OlBlock {...props} />
      default:
        return next()
    }
  }

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
      case 'underlined':
        return <UnderlinedMark {...props} />
      default:
        return next()
    }
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    console.log(type)
    console.log(this.editor)
    this.editor.toggleMark(type)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }
}

export default SlateEditor;