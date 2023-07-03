import { GlobalTokens, ICompileOptions } from '@idl/data-types/core';
import { LogManager } from '@idl/logger';
import { IDL_INDEX_OPTIONS, IDLIndex } from '@idl/parsing/index';
import { ILocalTokens } from '@idl/parsing/syntax-tree';

IDL_INDEX_OPTIONS.IS_TEST = true;

describe(`[auto generated] Correctly extract variables from`, () => {
  it(`[auto generated] function methods`, async () => {
    // create index
    const index = new IDLIndex(
      new LogManager({
        alert: () => {
          // do nothing
        },
      }),
      0
    );

    // test code to extract tokens from
    const code = [
      `function myclass::mymethod, arg1, arg2, arg3, KW1=kw1,$ ; commment`,
      `  KW2 = kw2, KW3 = kw3`,
      `  compile_opt idl2`,
      ``,
      `  return, 1`,
      `end`,
    ];

    // extract tokens
    const tokenized = await index.getParsedProCode('not-real', code, true);

    // define expected local variables
    const expectedVars: ILocalTokens = {
      func: {
        'myclass::mymethod': {
          kw1: {
            type: 'v',
            name: 'kw1',
            pos: [0, 50, 3],
            meta: {
              display: 'kw1',
              isDefined: true,
              usage: [[0, 50, 3]],
              docs: '',
              source: 'user',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
            },
          },
          kw2: {
            type: 'v',
            name: 'kw2',
            pos: [1, 8, 3],
            meta: {
              display: 'kw2',
              isDefined: true,
              usage: [[1, 8, 3]],
              docs: '',
              source: 'user',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
            },
          },
          kw3: {
            type: 'v',
            name: 'kw3',
            pos: [1, 19, 3],
            meta: {
              display: 'kw3',
              isDefined: true,
              usage: [[1, 19, 3]],
              docs: '',
              source: 'user',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
            },
          },
          arg1: {
            type: 'v',
            name: 'arg1',
            pos: [0, 28, 4],
            meta: {
              display: 'arg1',
              isDefined: true,
              usage: [[0, 28, 4]],
              docs: '',
              source: 'user',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
            },
          },
          arg2: {
            type: 'v',
            name: 'arg2',
            pos: [0, 34, 4],
            meta: {
              display: 'arg2',
              isDefined: true,
              usage: [[0, 34, 4]],
              docs: '',
              source: 'user',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
            },
          },
          arg3: {
            type: 'v',
            name: 'arg3',
            pos: [0, 40, 4],
            meta: {
              display: 'arg3',
              isDefined: true,
              usage: [[0, 40, 4]],
              docs: '',
              source: 'user',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
            },
          },
          self: {
            type: 'v',
            name: 'self',
            pos: [0, 9, 17],
            meta: {
              display: 'self',
              isDefined: true,
              docs: 'A reference to our object class',
              source: 'user',
              type: [
                { name: 'myclass', display: 'myclass', args: [], meta: {} },
              ],
              usage: [],
            },
          },
        },
      },
      pro: {},
      main: {},
    };

    // verify results
    expect(tokenized.local).toEqual(expectedVars);

    // define expected global variables
    const expectedGlobal: GlobalTokens = [
      {
        type: 'fm',
        name: 'myclass::mymethod',
        pos: [0, 9, 17],
        meta: {
          className: 'myclass',
          method: 'mymethod',
          source: 'user',
          args: {
            arg1: {
              docs: '',
              private: false,
              source: 'internal',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
              direction: 'bidirectional',
              req: true,
              display: 'arg1',
              code: true,
              pos: [0, 28, 4],
            },
            arg2: {
              docs: '',
              private: false,
              source: 'internal',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
              direction: 'bidirectional',
              req: true,
              display: 'arg2',
              code: true,
              pos: [0, 34, 4],
            },
            arg3: {
              docs: '',
              private: false,
              source: 'internal',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
              direction: 'bidirectional',
              req: true,
              display: 'arg3',
              code: true,
              pos: [0, 40, 4],
            },
          },
          docs: '#### myclass::mymethod\n\n```idl\nresult = object.mymethod( arg1, arg2, arg3, [ KW1 = any ], [ KW2 = any ], [ KW3 = any ])\n```\n\n#### Arguments\n\n- **arg1**: bidirectional, required, any\n\n  \n\n- **arg2**: bidirectional, required, any\n\n  \n\n- **arg3**: bidirectional, required, any\n\n  \n\n\n#### Keywords\n\n- **KW1**: bidirectional, optional, any\n\n    \n\n- **KW2**: bidirectional, optional, any\n\n    \n\n- **KW3**: bidirectional, optional, any\n\n    \n\n',
          docsLookup: {},
          display: 'myclass::mymethod',
          kws: {
            kw1: {
              docs: '',
              private: false,
              source: 'internal',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
              direction: 'bidirectional',
              req: false,
              display: 'KW1',
              code: true,
              pos: [0, 46, 3],
            },
            kw2: {
              docs: '',
              private: false,
              source: 'internal',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
              direction: 'bidirectional',
              req: false,
              display: 'KW2',
              code: true,
              pos: [1, 2, 3],
            },
            kw3: {
              docs: '',
              private: false,
              source: 'internal',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
              direction: 'bidirectional',
              req: false,
              display: 'KW3',
              code: true,
              pos: [1, 13, 3],
            },
          },
          private: false,
          returns: [{ name: 'any', display: 'any', args: [], meta: {} }],
          struct: [],
        },
        file: 'not-real',
      },
    ];

    // verify results
    expect(tokenized.global).toEqual(expectedGlobal);

    // define expected compile options
    const expectedCompile: ICompileOptions = {
      func: { 'myclass::mymethod': ['idl2'] },
      pro: {},
      main: [],
    };

    // verify results
    expect(tokenized.compile).toEqual(expectedCompile);
  });
});