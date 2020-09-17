class ArithmeticSimulator {
	constructor(max, min) {
		this.max = max
		this.min = min
		this.operationArr = ['+', '-', '*', '/']
	}
	getRandomExampel() {
		this.firstNumber = Math.floor(this.min + Math.random() * (this.max - this.min + 1))
		this.secondNumber = Math.floor(this.min + Math.random() * (this.max - this.min + 1))
		let randomIndex = Math.floor(Math.random() * 4)
		this.operation = this.operationArr[randomIndex]
		if (randomIndex === 0) {
			this.result = this.firstNumber + this.secondNumber
		} else if (randomIndex === 1) {
			this.result = this.firstNumber - this.secondNumber
		} else if (randomIndex === 2) {
			this.result = this.firstNumber * this.secondNumber
		} else if (randomIndex === 3) {
			this.result = this.firstNumber / this.secondNumber
		}

		this.firstNumberInput.value = this.firstNumber
		this.operationInput.value = this.operation
		this.secondNumberInput.value = this.secondNumber


	}
	printNumberInput(textLabel, containerAddress, typeInput) {
		let label = document.createElement('label')
		let div = document.createElement('div')
		label.innerText = textLabel
		let input = document.createElement('input')
		input.setAttribute('type', typeInput)
		label.appendChild(input)
		div.appendChild(label)
		containerAddress.appendChild(div)
		return input

	}
	checkValue() {
		let answer = parseFloat(this.resultInput.value)
		if (answer === this.result)
			this.massgeDiv.innerText = 'Result:Ok'
		else
			this.massgeDiv.innerText = 'Result:Wrong'

	}
	render(containerId) {
		const container = document.getElementById(containerId)
		this.firstNumberInput = this.printNumberInput('First number', container, "number")

		this.operationInput = this.printNumberInput('Operation', container, "text")

		this.secondNumberInput = this.printNumberInput('Second number', container, "number")

		const div = document.createElement('div')
		div.innerHTML = '<hr>'
		container.appendChild(div)

		this.resultInput = this.printNumberInput('Your answer', container, "number")

		let btn = document.createElement('button')
		btn.innerText = 'Check'
		btn.onclick = this.checkValue.bind(this)
		container.appendChild(btn)
		btn = document.createElement('button')
		btn.innerText = 'Next exampel'
		btn.onclick = this.getRandomExampel.bind(this)
		container.appendChild(btn)
		this.massgeDiv = document.createElement('div')
		container.appendChild(this.massgeDiv)
	}
}

class NewArithmeticSimulator extends ArithmeticSimulator {
	constructor(max, min) {
		super(max, min)
		this.wrongAmswer = []
		this.numberOfTest = 0
	}
	checkValue() {
		super.checkValue()

		let answer = parseFloat(this.resultInput.value)
		this.numberOfTest++

			if (answer !== this.result) {
				let a = {
					exampel: `${this.firstNumber} ${this.operation} ${this.secondNumber}`,
					answer: answer,
					result: this.result
				}
				this.wrongAmswer.push(a)
			}
		this.resultInput.value = ''
		this.getRandomExampel()

	}
	printResult() {
		this.massgeDiv.innerText = ''

		let totalInp = this.printNumberInput('Total', this.massgeDiv, "number")

		let correctInp = this.printNumberInput('Correct', this.massgeDiv, "number")

		let scoreInp = this.printNumberInput('Score', this.massgeDiv, "number")

		totalInp.value = this.numberOfTest
		correctInp.value = this.numberOfTest - this.wrongAmswer.length
		scoreInp.value = (this.numberOfTest - this.wrongAmswer.length) * 2

		const tab = document.createElement('table')
		tab.setAttribute('border', '2px')
		let tr = document.createElement('tr')
		let th = document.createElement('th')
		th.innerText = 'Неправильні відповіді'
		tr.appendChild(th)
		th = document.createElement('th')
		th.innerText = 'Правильно так'
		tr.appendChild(th)
		tab.appendChild(tr)

		for (let i = 0; i < this.wrongAmswer.length; i++) {
			tr = document.createElement('tr')
			let td = document.createElement('td')
			td.innerText = `${this.wrongAmswer[i].exampel}=${this.wrongAmswer[i].answer}`
			tr.appendChild(td)
			td = document.createElement('td')
			td.innerText = `${this.wrongAmswer[i].exampel}=${this.wrongAmswer[i].result}`
			tr.appendChild(td)
			tab.appendChild(tr)
		}
		this.massgeDiv.appendChild(tab)
	}

	render(containerId) {
		super.render(containerId)
		this.container = document.getElementById(containerId)

		let btn = document.createElement('button')
		btn.innerText = 'End'
		btn.onclick = this.printResult.bind(this)
		this.container.appendChild(btn)

	}
}
window.onload = function() {
	let simulator = new NewArithmeticSimulator(0, 8)
	simulator.render('container')
	simulator.getRandomExampel()
}