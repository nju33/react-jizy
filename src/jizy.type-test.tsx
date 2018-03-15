import React from 'react';
import Jizy from './jizy';

const jizy = new Jizy<'Foo' | 'Bar' | 'Baz'>();

// @ts-ignore: cannot find module
// tslint:disable-next-line no-implicit-dependencies
jizy.add('Foo', () => import('foo/component'));

// tslint:disable-next-line variable-name
const Foo = jizy.components.Foo as React.ComponentClass<{foo: string}>

console.log(<Foo foo="fooooo" />);
