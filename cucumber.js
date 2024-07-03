const common = [
  'features/**/*.feature',
  '--require-module ts-node/register',
  '--require steps/**/*.ts',
  '--format progress',
  '--format json:./cucumber_report.json'
].join(' ');

module.exports = {
  default: common,
  desktop: `${common} --tags @desktop`,
  tablet: `${common} --tags @tablet`,
  mobile: `${common} --tags @mobile`
};
