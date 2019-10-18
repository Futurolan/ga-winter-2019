import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.scss'

class Accordion extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const { icon, title, text } = this.props

    return (
      <div className='ga-accordion panel'>
        <div className='panel-heading has-background-primary' onClick={this.toggleMenu}>
          <div className='level is-mobile'>
            <div className='level-left'>
              <div className='level-item'>
                <h2 className='title is-size-5 has-text-white'><i className={`fas ${icon}`} />&nbsp;&nbsp;{title}</h2>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item has-text-white'>
                {this.state.isOpen && <i className='fas fa-caret-up' />}
                {!this.state.isOpen && <i className='fas fa-caret-down' />}
              </div>
            </div>
          </div>
        </div>
        <div className={classNames('panel-block', 'has-background-white', 'content', { 'is-open': this.state.isOpen })}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    )
  }
}

Accordion.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

export default Accordion
