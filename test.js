const https = require('https');
https.get('https://raw.githubusercontent.com/timothycarambat/senate-stock-watcher-data/master/aggregate/all_transactions.json', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const d = JSON.parse(data);
      console.log('Senate first:', d[0]);
    } catch(e) { console.error('Senate error', e.message, data.substring(0, 100)); }
  });
});
https.get('https://raw.githubusercontent.com/timothycarambat/house-stock-watcher-data/master/data/all_transactions.json', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const d = JSON.parse(data);
      console.log('House first:', d[0]);
    } catch(e) { console.error('House error', e.message, data.substring(0, 100)); }
  });
});
