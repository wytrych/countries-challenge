import React, { Component } from 'react'
import spinner from '../ripple.svg'

export class Image extends Component {

    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            hideFlag: true,
        }
    }

    imageError () {
        this.setState({
            loading: false,
            hideFlag: true,
        })
    }

    imageLoaded () {
        this.setState({
            loading: false,
            hideFlag: false,
        })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.countryCode !== this.props.countryCode)
            this.setState({
                loading: true,
                hideFlag: true,
            })
    }

    render () {
        const CC = this.props.countryCode || ''
        const url = CC ? `http://www.geognos.com/api/en/countries/flag/${CC}.png` : ''
        return (
            <div className={'flag-container' + (this.state.hideFlag ? ' hide-flag' : '') + (this.state.loading ? ' loading' : '')}>
                <img alt='Spinner' src={spinner} className='spinner' />
                <img alt='Country flag' src={url} className='flag' onLoad={this.imageLoaded.bind(this)} onError={this.imageError.bind(this)} />
            </div>
        )
    }
}
