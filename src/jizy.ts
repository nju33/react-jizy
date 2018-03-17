import React from 'react';
import {JizyComponentClass} from './interfaces';
import {Store} from './store';
import {Lazy} from './lazy';
import {jizyComponentFactory} from './jizy-component';

class Jizy<I extends string> implements Store<I>, Lazy {
  store: {[k: string]: React.ComponentClass<any>} = {};
  components: {[P in I]: JizyComponentClass} = {} as {
    [P in I]: JizyComponentClass
  };
  // tslint:disable-next-line variable-name
  DefaultLoader: React.SFC<any> | React.ComponentClass<any> | undefined;

  // tslint:disable-next-line variable-name
  constructor(DefaultLoader?: React.SFC<any> | React.ComponentClass<any>) {
    this.DefaultLoader = DefaultLoader;
  }

  async add(
    importName: I,
    getComponent: () => Promise<JizyComponentClass>,
  ): Promise<void> {
    // tslint:disable-next-line variable-name
    const JizyComponent = jizyComponentFactory<I>({
      jizy: this,
      importName,
      getComponent,
    });

    if (this.components !== undefined) {
      this.components[importName] = JizyComponent;

      return;
    }

    this.components = {
      [importName]: JizyComponent,
    } as {[P in I]: any};
  }
}

export default Jizy;
