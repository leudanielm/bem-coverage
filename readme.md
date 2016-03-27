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
// Output to folder
const bemCoverage = require('bem-coverage');
bemCoverage({
  directory: '/path/to/css/files',
  types: 'css,sass',
  output: '/path/to/report/output/dir'
});

//Supply callback function
bemCoverage({
  directory: '/path/to/css/files',
  types: 'css,sass'
}, function(data) {
    console.log(data.stats.BEM_RATIO, //outputs the percentage of BEM statements in your files
      data.stats.BEM, //outputs the number of BEM statements in your files
      data.report); //outputs the HTML report as a string
});
```

#####Sample output:
![alt tag](https://i.imgur.com/WPQBCYD.png)