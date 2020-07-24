import React from 'react';
import './App.css';

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date().toLocaleTimeString(),
			food: ['Pizza', 'Burger', 'Faluda', 'Ice-Cream'],
			isToggleOn: true,
			fname: '',
			hobby: true,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		setInterval(() => {
			this.tick();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval();
	}

	// tick function that set the date in the state.
	tick = () => {
		this.setState({
			date: new Date().toLocaleTimeString()
		});
	};

	handleClick(name){
		console.log('name is ', name);
		this.setState((state) => ({
			isToggleOn: !state.isToggleOn
		}));
	};

	handleSubmit(event) {
		console.log('fname log', this.state.fname, this.state.hobby);
		event.preventDefault();
	}

	handleChange(event) {

		let target = event.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;

		this.setState({
			[name]: value
		});
	}


	render() {
		const list = (
			<ul>
				{this.props.data.map(data=>
					<div key={data.id}>
						<p>{data.name}</p>
						<p>{data.title}</p>
					</div>)
				}
			</ul>
		);

		let input = (
			<input value={null}/>
		);

		setTimeout(() => {
			input = (
				<input value="hii"/>
			);
		}, 2000);
		return (
			<div>
				<h1>date is {this.state.date} {this.props.name}</h1>
				<button type='button' onClick={this.handleClick.bind(this, 'Mayur bhai')}>Toggle {this.state.isToggleOn ? 'On' : 'Off'} </button>
				{
					this.props.name &&
						<h2>this is the conditional props.</h2>
				}

				<ul>{this.state.food &&
				this.state.food.map((foodData, i) => <li key={i}>{foodData}</li>)
				}</ul>

				{list}
				{input}
				<FunctionalComponent name="bhai" />
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="fname">
						<input type="text" name="fname" value={this.state.fname} onChange={this.handleChange}/>
					</label>
					<label htmlFor="hobby">
						<input type="checkbox" name='hobby' checked={this.state.hobby} onChange={this.handleChange}/>
					</label>
					<input type="submit" name="submit"/>
				</form>
			</div>
		)
	}
}

function FunctionalComponent(props) {
	return (
		<div>
			<h3>this is the functional component {props.name}.</h3>
		</div>
	)
}

function App() {
	const name = 'React.js demo';
	const data = [{
		id: 1, name: "React.js", title: 'Facebook has develope.'
	},
		{
			id: 2, name: "Vue.js", title: 'Evan vyou has develope.'
		}];
	return (
		<Clock name={name} data={data}/>
	)
}

export default App;
