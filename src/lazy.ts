import React from 'react';

export abstract class Lazy {
  // tslint:disable-next-line variable-name
  DefaultLoader: React.SFC<any> | React.ComponentClass<any> | undefined;
}
