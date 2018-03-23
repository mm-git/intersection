let fs = require('fs');

fs.readdir('.', function(err, filelist){
  if (err) {
    throw err;
  }

  filelist = filelist.filter((file) => {
    return file !== '.DS_Store' &&
           file !== 'create_int_list.json' &&
           file !== 'area.json';
  })

  let jsonText = JSON.stringify({area: filelist});
  fs.writeFile('area.json', jsonText, 'utf8', () => {});
});
