import React, { Component } from 'react';
import './App.css';

import Select from 'react-select'
import 'react-select/dist/react-select.css';

import { COUNTRIES } from './countries.js'
import { LIST } from './list.js'

import { Country } from './components/country'
import { Image } from './components/image'

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            countryCode: '',
            selectedCountry: '',
        }
    }

    updateCountry (val) {
        this.setState({
            countryCode: COUNTRIES[val.label],
            selectedCountry: val,
        })
    }

  render() {
    return (
      <div className="App">
          <div className={this.state.countryCode ? '' : 'show'}>
              Select a country
          </div>
          <div className={'country' + (this.state.countryCode ? ' show' : '')}>
              <Image countryCode={this.state.countryCode} />
              <Country countryCode={this.state.countryCode} />
          </div>
          <Select name='name' value={this.state.selectedCountry} options={LIST} onChange={this.updateCountry.bind(this)} />
      </div>
    );
  }
}

export default App;
