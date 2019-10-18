import React from 'react'
import PropTypes from 'prop-types'

import PartnerLogo from 'components/partners/PartnerLogo'

import config from 'config/config'

class PartnerCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = { partners: [] }

    this.randomizePartner = this.randomizePartner.bind(this)
  }

  componentDidMount () {
    this.setState({ partners: this.props.partners.slice(0, config.home.partners.count) })
    if (this.props.partners.length > config.home.partners.count) {
      setTimeout(this.randomizePartner, config.home.partners.delay * 1000)
    }
  }

  randomizePartner () {
    this.setState({ partners: [] })
    this.setState({ partners: this._shuffle(this.props.partners).slice(0, config.home.partners.count) })
    setTimeout(this.randomizePartner, config.home.partners.delay * 1000)
  }

  _shuffle ([...arr]) {
    let m = arr.length
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]]
    }
    return arr
  };

  render () {
    const { partners } = this.state
    return <div className='ga-partner-carousel columns is-vcentered is-centered'>
      {partners.map((partner) => {
        return <div key={partner.nid} className='column is-2'>
          <PartnerLogo title={partner.title} imageUrl={partner.image.derivative.url} url={partner.url} />
        </div>
      })}
    </div>
  }
}

PartnerCarousel.propTypes = {
  partners: PropTypes.array
}

export default PartnerCarousel
