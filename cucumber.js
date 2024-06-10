const common = [
    'features/**/*.feature',               // Specify our feature files
    '--require-module ts-node/register',   // Load TypeScript module
    '--require steps/**/*.ts',             // Load step definitions
    '--format progress',                   // Load custom formatter
  ].join(' ');
  
  module.exports = {
    default: common
  };
  