import {JizyComponentClass} from './interfaces';

export abstract class Store<I extends string> {
  store: {[k: string]: React.ComponentClass<any>} = {};
  components: {[P in I]: JizyComponentClass} = {} as {
    [P in I]: JizyComponentClass
  };

  abstract add(
    importName: string,
    getComponent: () => Promise<JizyComponentClass>
  ): Promise<void>;
}
