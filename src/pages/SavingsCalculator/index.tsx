import Chip from '@mui/material/Chip';

const SavingsCalculator = () => {
  return (
    <div className="min-h-screen bg-white grid grid-rows-[auto_auto]">
      <main className="flex items-center justify-center w-full px-4">
        <div id="left-container">
          <div
            id="text-container"
            className="flex flex-col gap-4 items-start max-w-[50%]"
          >
            <Chip
              size="small"
              className="rounded-2xl text-gray-700 text-sm font-semibold"
              label="Lumo energy savings calculator"
            />
            <h1 className="text-zinc-900 text-6xl font-light">
              <span>Your home could </span>
              <span>save £1,472 a year</span>
            </h1>
            <h2 className="text-gray-500 text-3xl font-light">
              With 12 solar panels and a 15kWh battery in a 2 bed home optimised
              by Lumo
            </h2>
          </div>
        </div>
        <div id="right-container">RIGHT</div>
      </main>

      <footer className="border-t border-gray-200 py-4 px-4">
        <div className="w-full flex items-center gap-2 justify-center">
          <div className="text-sm text-gray-500">
            Total system cost:{' '}
            <span className="font-medium text-black">£9,000</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Monthly bill cost: </span>
            <span className="font-medium text-black">£87</span>
          </div>
          <button className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 transition">
            Get your free quote
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SavingsCalculator;
