## BEM Coverage

### A tool to report the BEM coverage for your projects
##### You can use it both as cli or NodeJS module:

##### CLI:
```
npm install bem-coverage -g
```

You can run it as a command line tool by providing these arguments
```
bem-coverage --dir=/path/to/css/files --types=css,scss --output=/path/to/report/output/dir
```
...or run it in the current directory for css and sass extensions (the default types), like this:
```
cd /path/to/my/css
bem-coverage > bem-output.html
```

##### NodeJS:
```javascript
// Output to folder
const bemCoverage = require('bem-coverage');
bemCoverage({
  directory: '/path/to/css/files',
  types: 'css,scss', //defaults
  output: '/path/to/report/output/dir'
});

//Supply callback function
bemCoverage({
  directory: '/path/to/css/files',
  types: 'css,scss'
}, function(data) {
    console.log(data.stats.BEM_RATIO, //outputs the percentage of BEM statements in your files
      data.stats.BEM, //outputs the number of BEM statements in your files
      data.report); //outputs the HTML report as a string
});
```

##### Sample output:
![alt tag](http://i.imgur.com/W3l5Qqx.png)
