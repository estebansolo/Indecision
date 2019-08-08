import React from 'react';

import { Header } from '../components/Header';
import { Action } from '../components/Action';
import { AddOption } from '../components/AddOption';
import { Options } from '../components/Options';

class Indecision extends React.Component {
	state = {
		options: []
	};

	componentDidMount() {
		try {
			const json = localStorage.getItem('indecisionOptions');
			const options = JSON.parse(json);
			if (options) {
				this.setState({ options });
			}
		} catch (error) {
			console.log('Nothing but error');
		}

		console.log('fetching data');
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('indecisionOptions', json);
		}
		console.log('saving data');
	}

	componentWillUnmount() {
		console.log('Component Will Unmount');
	}

	handleDeleteOptions = () => {
		this.setState({ options: [] });
	};

	handleDeleteSingleOption = (option) => {
		this.setState({ options: this.state.options.filter((opt) => opt !== option) });
	};

	handlePick = () => {
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomNum];
		alert(option);
	};

	handleAddOption(option) {
		if (!option) {
			return 'Enter valid value to add item';
		} else if (this.state.options.indexOf(option) !== -1) {
			return 'This option already exists';
		}

		this.setState({ options: this.state.options.concat([ option ]) });
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				<Action hasOptions={this.state.options.length == 0} randomPick={this.handlePick} />
				<Options
					options={this.state.options}
					deleteOptions={this.handleDeleteOptions}
					handleDeleteSingleOption={this.handleDeleteSingleOption}
				/>
				<AddOption handleAddOption={this.handleAddOption} />
			</React.Fragment>
		);
	}
}

Indecision.defaultProps = {
	options: []
};

export default Indecision;