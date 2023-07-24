import { DEFAULT_PARSER_OPTIONS, IParserOptions } from '@idl/parser';
import copy from 'fast-copy';

/**
 * Options for controlling behavior of the IDL Index
 */
export const IDL_INDEX_OPTIONS = {
  /**
   * Is compression enabled?
   */
  COMPRESSION: true,
  /**
   * How frequently we manually run garbage collection to limit
   * RAM consumption
   *
   * This indicates the number of files we parse or post-process when we
   * process more than one file at a time
   */
  GC_FREQUENCY: 200,
  /**
   * Flag if we are our main thread or not.
   *
   * Alters the behavior of our worker thread to be more efficient about what
   * we store/save locally (i.e. strip most values from global tokens because we)
   * don't need them.
   */
  IS_MAIN_THREAD: true,
  /**
   * Flag if we are running in tets or not.
   *
   * Tweaks behavior for loading global tokens
   */
  IS_TEST: false,
};

/**
 * Data structure that tracks recursion for folders that we
 * need to process so that we match how IDL works
 */
export interface IFolderRecursion {
  [key: string]: boolean;
}

/**
 * Types of files that we track
 */
export type IDLFileType =
  | 'pro'
  | 'save'
  | 'idl.json'
  | 'envi-task'
  | 'idl-task'
  | 'idl-notebook';

/**
 * Lookup by file type
 */
export type IDLFileTypeLookup = {
  [T in IDLFileType]: Set<string>;
};

/**
 * Options when indexing PRO code
 */
export interface IIndexProCodeOptions extends IParserOptions {
  /**
   * Do we post process the file or not
   */
  postProcess: boolean;
  /**
   * Do change detection when we index
   */
  changeDetection: boolean;
}

/**
 * Default options when indexing PRO code
 */
export const DEFAULT_INDEX_PRO_CODE_OPTIONS: IIndexProCodeOptions = {
  ...copy(DEFAULT_PARSER_OPTIONS),
  postProcess: true,
  changeDetection: true,
};
