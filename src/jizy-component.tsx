import * as React from 'react';
import {JizyComponentClass} from './interfaces';
import {Store} from './store';
import {Lazy} from './lazy';

export interface JizyComponentProps {
  Component?: React.ComponentClass<any>;
}

export interface JizyComponentFactoryOptions<I extends string> {
  jizy: Store<I> & Lazy;
  importName: I;
  getComponent(): Promise<JizyComponentClass>;
}

// tslint:disable-next-line only-arrow-functions
export function jizyComponentFactory<I extends string>(
  options: JizyComponentFactoryOptions<I>
) {
  return class extends React.Component<any, JizyComponentProps> {
    static displayName = 'Jizy';

    constructor(props: any) {
      super(props);

      this.state = {
        Component: options.jizy.store[options.importName]
      };
    }

    render() {
      if (
        this.state.Component === undefined
      ) {
        return options.jizy.DefaultLoader === undefined ? null : (
          <options.jizy.DefaultLoader />
        );
      }

      return <this.state.Component />;
    }

    async componentDidMount() {
      if (this.state.Component !== undefined) {
        return;
      }

      // tslint:disable-next-line variable-name
      const Component = await options.getComponent();
      this.setState({
        Component,
      });
    }
  };
}
