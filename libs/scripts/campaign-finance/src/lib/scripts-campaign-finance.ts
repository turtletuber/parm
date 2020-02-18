import * as fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import { get } from '@prmichaelsen/ts-utils';

// data source https://campaignfinance.tempe.gov/Search/Contributors
export async function scriptsCampaignFinance() {
  const path = '/Users/mchpatr/notes/private/misc/2020-tempe-city-council-contributions/';
  const files = fs.readdirSync(path);
  const data = files
    .filter(file => file.includes('.json'))
    .map(file => fs.readFileSync(path + file))
    .map(o => o.toString())
    .map(o => JSON.parse(o))
    .map(o => o.JSON.Data)
    .flat();
  const header = Object.keys(data[0]).map((title, id) => ({ id: String(id), title }));
  const rows = data.map(row => Object.keys(row).map((key: string) => {
    const val = row[key];
    if (typeof val === 'string' && val.includes('Date')) {
      return get(val,
        o => val.substring(
          val.indexOf('(') + 1,
          val.indexOf(')'),
        ),
        o => parseInt(o, 10),
        o => new Date(o),
        o => o.toISOString().split('T')[0]
      );
    }
    return val;
  }));
  console.log(rows[0]);
  const writer = createObjectCsvWriter({
    header,
    path: path + '/data.csv',
  });
  await new Promise(r => writer.writeRecords(rows).then(r));
}
