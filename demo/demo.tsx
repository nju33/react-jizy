import React from 'react';
// @ts-ignore
import {render} from 'react-dom';
import Jizy from '../src/jizy';

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

render(
  <View />,
  div
)
