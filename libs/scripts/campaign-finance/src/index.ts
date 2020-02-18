import { scriptsCampaignFinance } from './lib/scripts-campaign-finance';

// ts-node --project libs/scripts/campaign-finance/tsconfig.lib.json libs/scripts/campaign-finance/src/index.ts
async function main() {
  await scriptsCampaignFinance();
} 

main();
