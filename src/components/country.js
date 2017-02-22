import React, { Component } from 'react';

export class Country extends Component {

    constructor (props) {
        super(props)
        this.state = {
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
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.countryCode !== this.props.countryCode) {
            this.loadNewCountry(nextProps.countryCode)
        }
    }

    loadNewCountry (countryCode = this.props.countryCode) {
        this.setState({
            loading: true,
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
                this.setState({
                    error: 'An error occured. Please try again later',
                })
            })
            .then(() => {
                this.setState({
                    loading: false,
                })
            })
    }

    updateVersion (e) {
        this.setState({
            version: (e.target.checked) ? 2 : 1,
        }, this.loadNewCountry)
    }

    render () {
        return (
            <div>
                {this.state.loading &&
                    <h1>Loading</h1>
                }
                {this.state.error &&
                    <h1 className='error'>{this.state.error}</h1>
                }
              <h1>{this.state.name}</h1>
              <h2>({this.state.nativeName})</h2>
              <h3>{this.state.subregion}</h3>
              <h4>domain: {this.state.topLevelDomain}</h4>
              <div>
                  <ul>
                      <li>
                          Languages:
                          <ul>
                              {this.state.languages.map((language, i) => (
                                  <li key={i}>{(this.state.loadedVersion === 2) ? language.name : language}</li>
                              ))}
                          </ul>
                      </li>
                      <li>
                          Timezones:
                          <ul>
                              {this.state.timezones.map((timezone, i) => (
                                  <li key={i}>{timezone}</li>
                              ))}
                          </ul>
                      </li>
                      <li>
                          Currencies:
                          <ul>
                              {this.state.currencies.map((currency, i) => (
                                  ((this.state.loadedVersion === 2 &&
                                       <li key={i}>{currency.code} - {currency.name}</li>
                                   ) ||
                                       <li key={i}>{currency}</li>
                                  )
                              ))}
                          </ul>
                      </li>
                  </ul>
              </div>
              <label>
                  Use API v2 to get more info (undocumented): <input type='checkbox' onChange={this.updateVersion.bind(this)} />
              </label>
          </div>
        )
    }
}
