# react-jizy

React component wrapper for lazy import

[![npm: react-jizy](https://img.shields.io/npm/v/react-jizy.svg)](https://www.npmjs.com/package/react-jizy)
[![CircleCI](https://circleci.com/gh/nju33/react-jizy.svg?style=svg&circle-token=de24adf7fa04d69e7e1613f8616a276bf31eb1e9)](https://circleci.com/gh/nju33/react-jizy)
[![Coverage Status](https://coveralls.io/repos/github/nju33/react-jizy/badge.svg?branch=master)](https://coveralls.io/github/nju33/react-jizy?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![license: mit](https://img.shields.io/packagist/l/doctrine/orm.svg)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

## Install

```bash
yarn add react-jizy
# yarn add react @types/react
```

## Usage

demo is [here](https://nju33.github.io/react-jizy/).

```ts
import React from 'react';
import {render} from 'react-dom';
import Jizy from 'react-jizy';

class Loading extends React.Component {
  render() {
    return <div>loading</div>;
  }
}

const jizy = new Jizy<'Foo' | 'Bar'>(Loading);
jizy.add('Foo', async () => {
  const module = await import('./dynamic-foo');
  return module.DynamicFoo;
});
jizy.add('Bar', async () => {
  const module = await import('./dynamic-bar');
  return module.DynamicBar;
});

const div = document.createElement('div');
document.body.appendChild(div);

class View extends React.Component<any, any> {
  state = {
    foo: true
  }

  toggle = () => {
    this.setState({
      foo: !this.state.foo
    });
  }

  render() {
    return (
      <>
        {this.state.foo && <jizy.components.Foo />}
        {!this.state.foo && <jizy.components.Bar />}
        <button onClick={this.toggle}>button</button>
      </>
    );
  }
}

render(<View />, div)
```
