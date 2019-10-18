import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'

class ActiveLink extends React.Component {
  render () {
    const pathname = this.props.router.pathname
    const { label, path, as, className } = this.props

    return (
      <Link href={path} as={as}>
        <a className={classNames(className, { 'has-text-grey-lighter': pathname === path })}>{label}</a>
      </Link>
    )
  }
}

ActiveLink.propTypes = {
  router: PropTypes.object,
  label: PropTypes.string,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  as: PropTypes.string,
  className: PropTypes.string
}

export default withRouter(ActiveLink)
