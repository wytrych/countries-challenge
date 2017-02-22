import React, { Component } from 'react'
import './App.css'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { COUNTRIES } from './data/countries.js'
import { LIST } from './data/list.js'

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
            countryCode: val && COUNTRIES[val.label],
            selectedCountry: val,
        })
    }

    render () {
        return (
            <div className="App container">
                <div className={'country ' + (this.state.countryCode ? 'show' : '')}>
                    <div className='row'>
                        <Image countryCode={this.state.countryCode} />
                    </div>
                    <div className='row'>
                        <Country countryCode={this.state.countryCode} />
                    </div>
                </div>
                <div className='row'>
                    <Select name='country' placeholder='Select country...' value={this.state.selectedCountry} options={LIST} onChange={this.updateCountry.bind(this)} />
                </div>
            </div>
        )
    }
}

export default App
