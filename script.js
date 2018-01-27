function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  stop() {
      this.running = false;
      clearInterval(this.watch);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  printList() {
    let newTime = document.createElement('li');
    newTime.innerHTML = this.format(this.times);
    list.appendChild(newTime);
  }

  reset() {
    this.running = false;
    clearInterval(this.watch);
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  restart() {
    this.print();
    this.printList();
    this.reset();
    this.print();
  }

  clear() {
    list.innerText = "";
  }
}

const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

const list = document.querySelector('.results');

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.restart());

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());
