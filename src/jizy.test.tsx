import React from 'react';
import {shallow, mount} from 'enzyme';
import Jizy from './jizy';

describe('Jizy', () => {
  let jizy: Jizy<'Foo'>;

  test('call default loading', async () => {
    const loadingFn = jest.fn();
    const fn = jest.fn();
    // tslint:disable-next-line variable-name
    // tslint:disable-next-line
    const DefaultLoading = () => {
      loadingFn();

      return <div>loading...</div>;
    }
    jizy = new Jizy<'Foo'>(DefaultLoading);
    await jizy.add('Foo', async () => {
      fn();

      return class extends React.Component {
        render() {
          return <div />
        }
      }
    });

    // tslint:disable-next-line
    const element = mount(<jizy.components.Foo />);

    expect(loadingFn.mock.calls.length).toBe(1);
    expect(fn.mock.calls.length).toBe(1);
  });
});
