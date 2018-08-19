function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
  }

  calculate() {
    this.state.times.miliseconds += 1;
    if (this.state.times.miliseconds >= 100) {
      this.state.times.seconds += 1;
      this.state.times.miliseconds = 0;
    };
    if (this.state.times.seconds >= 60) {
      this.state.times.minutes += 1;
      this.state.times.seconds = 0;
    };
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
    this.setState({
      times: {
        minutes: this.state.times.minutes,
        seconds: this.state.times.seconds,
        miliseconds: this.state.times.miliseconds
      }
    });
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  }

  save() {
    this.setState({
      results: [...this.state.results, this.state.times]
    });
  }

  restart() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });;
  }

  reset() {
    this.save();
    this.restart();
    this.stop();
  }

  clear() {
    this.setState({
      results: []
    });
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  render() {
    return (
      <div className="container">
        <nav className="controls">
          <button type="button" id="start" onClick={ () => this.start() }>start</button>
          <button type="button" id="stop" onClick={ () => this.stop() }>stop</button>
          <button type="button" id="reset" onClick={ () => this.reset() }>save &#38; reset</button>
          <button type="button" id="clear" onClick={ () => this.clear() }>clear</button>
        </nav>
        <div className="stopwatch">{this.format(this.state.times)}</div>
        <ul className="results">
          {this.state.results.map(result => <li>{this.format(result)}</li>)}
        </ul>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<App/>, app);