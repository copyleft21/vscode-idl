import { Assembler } from '@idl/assembler';
import { CancellationToken } from '@idl/cancellation-tokens';
import { LogManager } from '@idl/logger';
import { GetTokenNames } from '@idl/parser';
import { IDL_INDEX_OPTIONS, IDLIndex } from '@idl/parsing/index';
import { SyntaxProblems } from '@idl/parsing/problem-codes';

IDL_INDEX_OPTIONS.IS_TEST = true;

describe(`[auto generated] Verify string literal styling`, () => {
  it(`[auto generated] simple`, async () => {
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
      `     compile_opt idl2    `,
      `a = \`my string with\${expression}\``,
      `b = \`something \${5 + 6*12}\``,
      ` c = \`   preserve as string\``,
      `;preserve interior spacing`,
      `a = \`with   \${expression()}  else\``,
      `        `,
      `end     `,
    ];

    // extract tokens
    const tokenized = await index.getParsedProCode('my_file.pro', code, {
      postProcess: true,
    });

    // extract token names
    const tokenizedNames = GetTokenNames(tokenized);

    // format code
    const formatted = Assembler(tokenized, new CancellationToken(), {
      autoFix: false,
      formatter: 'fiddle',
    });

    // verify formatting
    if (formatted === undefined) {
      expect(formatted).toEqual(undefined);
    } else {
      // define expected problems
      const expectedFormatting: string[] = [
        `compile_opt idl2`,
        `a = \`my string with\${expression}\``,
        `b = \`something \${5 + 6 * 12}\``,
        `c = \`   preserve as string\``,
        `; preserve interior spacing`,
        `a = \`with   \${expression()}  else\``,
        ``,
        `end`,
      ];

      // verify formatting
      expect(formatted.split(`\n`)).toEqual(expectedFormatting);

      // parse formatted code
      const reParsed = await index.getParsedProCode('my_file.pro', formatted, {
        postProcess: true,
      });

      // make sure the syntax trees are the same as they were before
      expect(GetTokenNames(reParsed)).toEqual(tokenizedNames);
    }

    // define expected problems
    const expectedProblems: SyntaxProblems = [
      {
        code: 99,
        info: 'Undefined variable "expression"',
        start: [1, 21, 10],
        end: [1, 21, 10],
      },
      {
        code: 104,
        info: 'Unused variable "b"',
        start: [2, 0, 1],
        end: [2, 0, 1],
      },
      {
        code: 104,
        info: 'Unused variable "c"',
        start: [3, 1, 1],
        end: [3, 1, 1],
      },
    ];

    // verify problems
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expectedProblems);
  });

  it(`[auto generated] multi-line`, async () => {
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
      `compile_opt idl2`,
      `; thing`,
      `a = \` first`,
      `    second`,
      `  third`,
      `\``,
      `end`,
    ];

    // extract tokens
    const tokenized = await index.getParsedProCode('my_file.pro', code, {
      postProcess: true,
    });

    // extract token names
    const tokenizedNames = GetTokenNames(tokenized);

    // format code
    const formatted = Assembler(tokenized, new CancellationToken(), {
      autoFix: false,
      formatter: 'fiddle',
    });

    // verify formatting
    if (formatted === undefined) {
      expect(formatted).toEqual(undefined);
    } else {
      // define expected problems
      const expectedFormatting: string[] = [
        `compile_opt idl2`,
        `; thing`,
        `a = \` first`,
        `    second`,
        `  third`,
        `\``,
        `end`,
      ];

      // verify formatting
      expect(formatted.split(`\n`)).toEqual(expectedFormatting);

      // parse formatted code
      const reParsed = await index.getParsedProCode('my_file.pro', formatted, {
        postProcess: true,
      });

      // make sure the syntax trees are the same as they were before
      expect(GetTokenNames(reParsed)).toEqual(tokenizedNames);
    }

    // define expected problems
    const expectedProblems: SyntaxProblems = [
      {
        code: 104,
        info: 'Unused variable "a"',
        start: [2, 0, 1],
        end: [2, 0, 1],
      },
    ];

    // verify problems
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expectedProblems);
  });
});
