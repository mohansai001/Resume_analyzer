const cron = require('node-cron');
const ImochaService = require('./imochaService');

const testIds = [1304441, 1228695, 1302022, 1228712, 1228715, 1228781, 1288123, 1228784, 1228718, 1228721, 1228724, 1228727, 1228730, 1228733, 1228736, 1228739, 1228742, 1228745];
const imochaService = new ImochaService();

const fetchCurrentDateResults = async () => {
  try {
    const targetDate = '2025-09-01';
    console.log(`Fetching iMocha results for ${targetDate}`);
    
    const result = await imochaService.fetchAndSaveResults(testIds, targetDate, targetDate);
    console.log(`Successfully processed ${result.count} attempts for ${targetDate}`);
  } catch (error) {
    if (error.message.includes('404')) {
      console.log('No results found for Sep 1st, 2025');
    } else {
      console.error('Error fetching Sep 1st results:', error.message);
    }
  }
};

const startScheduler = () => {
  // Scheduler disabled
  // cron.schedule('*/1 * * * *', fetchCurrentDateResults);
  console.log('iMocha results scheduler is disabled');
};

module.exports = {
  startScheduler,
  fetchCurrentDateResults
};