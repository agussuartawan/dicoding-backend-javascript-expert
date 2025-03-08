const createServer = require("./course/createServer");
const FigureCalculator = require("./course/FigureCalculator");
const MathBasic = require("./course/MathBasic");

const start = async () => {
  const figureCalculator = new FigureCalculator(MathBasic);
  const server = createServer({
    mathBasic: MathBasic,
    figureCalculator,
  });

  await server.start();
  console.log(`Server start at ${server.info.uri}`);
};

start();
