##BEM Coverage

###A tool to report the BEM coverage for your projects
#####You can use it both as cli or NodeJS module:

#####CLI:
```
npm install bem-coverage -g
bem-coverage --dir=/path/to/css/files --types=css,sass --output=/path/to/report/output/dir
```

#####NodeJS:
```
const bemCoverage = require('bem-coverage');
bemCoverage({
  directory: '/path/to/css/files',
  types: 'css,sass',
  output: '/path/to/report/output/dir'
});
```