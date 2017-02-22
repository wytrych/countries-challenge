import React, { Component } from 'react';

export class Image extends Component {

    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            showImage: false,
        }
    }

    imageError () {
        this.setState({
            loading: false,
            showImage: false,
        })
    }

    imageLoaded () {
        this.setState({
            loading: false,
            showImage: true,
        })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.countryCode !== this.props.countryCode) {
            this.setState({
                loading: true,
                showImage: false,
            })
        }
    }

    render () {
        const CC = this.props.countryCode || ''
        const url = CC ? `http://www.geognos.com/api/en/countries/flag/${CC}.png` : ''
        return (
            <div className={'flag ' + (this.state.showImage ? 'show' : '')}>
                <img alt='Country flag' src={url} onLoad={this.imageLoaded.bind(this)} onError={this.imageError.bind(this)} />
            </div>
        )
    }
}
