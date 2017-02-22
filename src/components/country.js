import React, { Component } from 'react'
import spinner from '../ripple.svg'

export class Country extends Component {

    constructor (props) {
        super(props)
        this.initialState = {
            loading: false,
            name: '',
            nativeName: '',
            subregion: '',
            timezones: [],
            currencies: [],
            topLevelDomain: '',
            languages: [],
            version: 1,
        }

        this.state = Object.assign({}, this.initialState, {firstLoad: true})

    }

    resetState () {
        this.setState(Object.assign({}, this.initialState, {firstLoad: true}))
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.countryCode === null)
            this.resetState()
        else if (nextProps.countryCode !== this.props.countryCode)
            this.loadNewCountry(nextProps.countryCode)
    }

    loadNewCountry (countryCode = this.props.countryCode) {
        this.setState({
            loading: true,
            firstLoad: false,
        })
        const url = `https://restcountries.eu/rest/v${this.state.version}/alpha/${countryCode}`
        fetch(url)
            .then((response) => response.json())
            .then((country) => {
                this.setState((prevState) => ({
                    name: country.name,
                    nativeName: country.nativeName,
                    subregion: country.subregion,
                    timezones: country.timezones,
                    currencies: country.currencies,
                    topLevelDomain: country.topLevelDomain,
                    languages: country.languages,
                    loadedVersion: prevState.version,
                }))
            })
            .catch(() => {
                this.setState({error: 'An error occured. Please try again later'})
            })
            .then(() => {
                this.setState({loading: false})
            })
    }

    updateVersion (e) {
        const version = (e.target.checked) ? 2 : 1
        this.setState({version}, this.loadNewCountry)
    }

    render () {
        return (
            <div className={'country-details' + (this.state.loading ? ' loading' : '') + (this.state.firstLoad ? ' first-load' : '')}>
                <img src={spinner} alt='Spinner' className='spinner' />
                {this.state.error &&
                    <h1 className='error'>{this.state.error}</h1>
                }
                <div className='content'>
                  <h1>{this.state.name}</h1>
                  <h2>({this.state.nativeName})</h2>
                  <h3>{this.state.subregion}</h3>
                  <h4>domain: {this.state.topLevelDomain}</h4>
                  <div className='detailed-info'>
                      <h5>Languages:</h5>
                      {this.state.languages.map((language, i) => (
                          <p key={i}>{(this.state.loadedVersion === 2) ? language.name : language}</p>
                      ))}
                      <h5>Timezones:</h5>
                      {this.state.timezones.map((timezone, i) => (
                          <p key={i}>{timezone}</p>
                      ))}
                      <h5>Currencies:</h5>
                      {this.state.currencies.map((currency, i) => (
                          ((this.state.loadedVersion === 2 &&
                               <p key={i}>{currency.code} - {currency.name}</p>
                           ) ||
                               <p key={i}>{currency}</p>
                          )
                      ))}
                  </div>
                  <label>
                      Use API v2 to get more info (undocumented): <input type='checkbox' onChange={this.updateVersion.bind(this)} />
                  </label>
              </div>
          </div>
        )
    }
}
