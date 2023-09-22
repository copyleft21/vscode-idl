import { CancellationToken } from '@idl/cancellation-tokens';
import { GlobalTokens, ICompileOptions } from '@idl/data-types/core';
import { LogManager } from '@idl/logger';
import { IDL_INDEX_OPTIONS, IDLIndex } from '@idl/parsing/index';
import { ILocalTokens } from '@idl/parsing/syntax-tree';

IDL_INDEX_OPTIONS.IS_TEST = true;

describe(`[auto generated] Verify fast parsing ignores docs`, () => {
  it(`[auto generated] for functions`, async () => {
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
      `;+`,
      `; :Arguments:`,
      `;   arg1: in, required, envitask`,
      `;     Placeholder docs for argument, keyword, or property`,
      `;   arg2: in, required, idltask`,
      `;     Placeholder docs for argument, keyword, or property`,
      `;   arg3: in, required, ENVITask<buildmosaicraster> | ENVITask<SubsetRaster>`,
      `;     Placeholder docs for argument, keyword, or property`,
      `;   arg4: in, required, IDLTask<S3_Download>`,
      `;     Placeholder docs for argument, keyword, or property`,
      `;   arg5: in, required, ENVITask<BuildMosaicRaster | SubsetRaster>`,
      `;     Placeholder docs for argument, keyword, or property`,
      `;`,
      `;-`,
      `function myfunc, arg1, arg2, arg3, arg4, arg5, KW1 = kw1`,
      `  compile_opt idl3`,
      `  return, 42`,
      `end`,
    ];

    // extract tokens
    const tokenized = await index.getParsedProCode(
      'not-real',
      code,
      new CancellationToken(),
      { postProcess: true, full: false }
    );

    // define expected local variables
    const expectedVars: ILocalTokens = {
      func: {
        myfunc: {
          kw1: {
            type: 'v',
            name: 'kw1',
            pos: [14, 53, 3],
            meta: {
              display: 'kw1',
              isDefined: true,
              usage: [[14, 53, 3]],
              docs: '',
              source: 'user',
              type: [{ name: 'any', display: 'any', args: [], meta: {} }],
            },
          },
          arg1: {
            type: 'v',
            name: 'arg1',
            pos: [14, 17, 4],
            meta: {
              display: 'arg1',
              isDefined: true,
              usage: [[14, 17, 4]],
              docs: 'Placeholder docs for argument, keyword, or property',
              source: 'user',
              type: [
                {
                  name: 'envitask',
                  display: 'ENVITask<any>',
                  args: [[{ name: 'any', display: 'any', args: [], meta: {} }]],
                  meta: {},
                },
              ],
            },
          },
          arg2: {
            type: 'v',
            name: 'arg2',
            pos: [14, 23, 4],
            meta: {
              display: 'arg2',
              isDefined: true,
              usage: [[14, 23, 4]],
              docs: 'Placeholder docs for argument, keyword, or property',
              source: 'user',
              type: [
                {
                  name: 'idltask',
                  display: 'IDLTask<any>',
                  args: [[{ name: 'any', display: 'any', args: [], meta: {} }]],
                  meta: {},
                },
              ],
            },
          },
          arg3: {
            type: 'v',
            name: 'arg3',
            pos: [14, 29, 4],
            meta: {
              display: 'arg3',
              isDefined: true,
              usage: [[14, 29, 4]],
              docs: 'Placeholder docs for argument, keyword, or property',
              source: 'user',
              type: [
                {
                  name: 'envibuildmosaicrastertask',
                  display: 'ENVITask<BuildMosaicRaster>',
                  args: [
                    [
                      {
                        name: 'BuildMosaicRaster',
                        display: 'BuildMosaicRaster',
                        args: [],
                        meta: {},
                      },
                    ],
                  ],
                  meta: {},
                },
                {
                  name: 'envisubsetrastertask',
                  display: 'ENVITask<SubsetRaster>',
                  args: [
                    [
                      {
                        name: 'SubsetRaster',
                        display: 'SubsetRaster',
                        args: [],
                        meta: {},
                      },
                    ],
                  ],
                  meta: {},
                },
              ],
            },
          },
          arg4: {
            type: 'v',
            name: 'arg4',
            pos: [14, 35, 4],
            meta: {
              display: 'arg4',
              isDefined: true,
              usage: [[14, 35, 4]],
              docs: 'Placeholder docs for argument, keyword, or property',
              source: 'user',
              type: [
                {
                  name: 'idls3_downloadtask',
                  display: 'IDLTask<s3_download>',
                  args: [
                    [
                      {
                        name: 's3_download',
                        display: 's3_download',
                        args: [],
                        meta: {},
                      },
                    ],
                  ],
                  meta: {},
                },
              ],
            },
          },
          arg5: {
            type: 'v',
            name: 'arg5',
            pos: [14, 41, 4],
            meta: {
              display: 'arg5',
              isDefined: true,
              usage: [[14, 41, 4]],
              docs: 'Placeholder docs for argument, keyword, or property',
              source: 'user',
              type: [
                {
                  name: 'envibuildmosaicrastertask',
                  display: 'ENVITask<BuildMosaicRaster>',
                  args: [
                    [
                      {
                        name: 'BuildMosaicRaster',
                        display: 'BuildMosaicRaster',
                        args: [],
                        meta: {},
                      },
                    ],
                  ],
                  meta: {},
                },
              ],
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
        type: 'f',
        name: 'myfunc',
        pos: [14, 9, 6],
        meta: {
          source: 'user',
          args: {
            arg1: {
              docs: 'Placeholder docs for argument, keyword, or property',
              direction: 'in',
              source: 'internal',
              type: [
                {
                  name: 'envitask',
                  display: 'ENVITask<any>',
                  args: [[{ name: 'any', display: 'any', args: [], meta: {} }]],
                  meta: {},
                },
              ],
              private: false,
              req: true,
              display: 'arg1',
              code: true,
              pos: [14, 17, 4],
            },
            arg2: {
              docs: 'Placeholder docs for argument, keyword, or property',
              direction: 'in',
              source: 'internal',
              type: [
                {
                  name: 'idltask',
                  display: 'IDLTask<any>',
                  args: [[{ name: 'any', display: 'any', args: [], meta: {} }]],
                  meta: {},
                },
              ],
              private: false,
              req: true,
              display: 'arg2',
              code: true,
              pos: [14, 23, 4],
            },
            arg3: {
              docs: 'Placeholder docs for argument, keyword, or property',
              direction: 'in',
              source: 'internal',
              type: [
                {
                  name: 'envibuildmosaicrastertask',
                  display: 'ENVITask<BuildMosaicRaster>',
                  args: [
                    [
                      {
                        name: 'BuildMosaicRaster',
                        display: 'BuildMosaicRaster',
                        args: [],
                        meta: {},
                      },
                    ],
                  ],
                  meta: {},
                },
                {
                  name: 'envisubsetrastertask',
                  display: 'ENVITask<SubsetRaster>',
                  args: [
                    [
                      {
                        name: 'SubsetRaster',
                        display: 'SubsetRaster',
                        args: [],
                        meta: {},
                      },
                    ],
                  ],
                  meta: {},
                },
              ],
              private: false,
              req: true,
              display: 'arg3',
              code: true,
              pos: [14, 29, 4],
            },
            arg4: {
              docs: 'Placeholder docs for argument, keyword, or property',
              direction: 'in',
              source: 'internal',
              type: [
                {
                  name: 'idls3_downloadtask',
                  display: 'IDLTask<s3_download>',
                  args: [
                    [
                      {
                        name: 's3_download',
                        display: 's3_download',
                        args: [],
                        meta: {},
                      },
                    ],
                  ],
                  meta: {},
                },
              ],
              private: false,
              req: true,
              display: 'arg4',
              code: true,
              pos: [14, 35, 4],
            },
            arg5: {
              docs: 'Placeholder docs for argument, keyword, or property',
              direction: 'in',
              source: 'internal',
              type: [
                {
                  name: 'envibuildmosaicrastertask',
                  display: 'ENVITask<BuildMosaicRaster>',
                  args: [
                    [
                      {
                        name: 'BuildMosaicRaster',
                        display: 'BuildMosaicRaster',
                        args: [],
                        meta: {},
                      },
                    ],
                  ],
                  meta: {},
                },
              ],
              private: false,
              req: true,
              display: 'arg5',
              code: true,
              pos: [14, 41, 4],
            },
          },
          docs: '\n```idl\nresult = myfunc( arg1, arg2, arg3, arg4, arg5, $\n [ KW1 = any ])\n```\n\n\n\n#### Arguments\n\n- **arg1**: in, required, ENVITask<any>\n\n  Placeholder docs for argument, keyword, or property\n\n- **arg2**: in, required, IDLTask<any>\n\n  Placeholder docs for argument, keyword, or property\n\n- **arg3**: in, required, ENVITask<BuildMosaicRaster> | ENVITask<SubsetRaster>\n\n  Placeholder docs for argument, keyword, or property\n\n- **arg4**: in, required, IDLTask<s3_download>\n\n  Placeholder docs for argument, keyword, or property\n\n- **arg5**: in, required, ENVITask<BuildMosaicRaster>\n\n  Placeholder docs for argument, keyword, or property\n\n\n#### Keywords\n\n- **KW1**: bidirectional, optional, any\n\n    \n\n',
          docsLookup: { default: '' },
          display: 'myfunc',
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
              pos: [14, 47, 3],
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
      func: { myfunc: [] },
      pro: {},
      main: [],
    };

    // verify results
    expect(tokenized.compile).toEqual(expectedCompile);
  });
});