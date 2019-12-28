import * as _ from 'lodash';

import { DEFAULT_APP_NAME } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sanitize = require('sanitize-filename');

export default function(platform: string, filenameToSanitize: string): string {
  let result = sanitize(filenameToSanitize);

  // remove all non ascii or use default app name
  // eslint-disable-next-line no-control-regex
  result = result.replace(/[^\x00-\x7F]/g, '') || DEFAULT_APP_NAME;

  // spaces will cause problems with Ubuntu when pinned to the dock
  if (platform === 'linux') {
    return _.kebabCase(result);
  }
  return result;
}
