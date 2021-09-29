# Refactoring JavaScript: Kata

> A coding playground to practice your refactoring skills.

I have crafted this kata for the [Refactoring JavaScript](https://refactoringjavascript.dev/) course 🎓

It is based on [J. B. Rainsberger's Trivia kata](https://github.com/jbrains/trivia), which is itself a fork from [a Legacy Code Retreat kata](https://github.com/caradojo/trivia).

## Pre-requisite

[Node.js](https://nodejs.org/en/download/releases/) `>= v14` and `< v17`

You can use [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n) to install a specific version of Node.

## Installation

1. Clone the repository: `git clone git@github.com:nicoespeon/refactoringjavascript-kata.git`
2. Install dependencies: `npm install`

## Run the tests

While working, I recommend you run them in watch mode:

```
npm test -- --watch
```

You can launch a single test run with `npm test`

Tests are using [Jest](https://jestjs.io/) to run.

Since this kata is tailored for refactorings, tests are already present. If you want to practice writing tests on existing code, I recommend:

- Learn about [Approval Testing]()
- Use one of [these refactorings kata]()
- Have a look at [Testing JavaScript](https://testingjavascript.com/) course from Kent C. Dodds
