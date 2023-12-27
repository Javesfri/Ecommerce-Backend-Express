import winston from "winston";

const customLevelOpt = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "cyan",
  },
};

const prodLogger = winston.createLogger({
  level:"info",
  levels: customLevelOpt.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
        level: "error",
        filename: "./errors.log",
      }),
  ],
});

const devLogger = winston.createLogger({
  level:"debug",
  levels: customLevelOpt.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
        level: "error",
        filename: "./errors.log",
      }),
  ],
});

const getLogger = () =>{
    if(process.env.ENVIRONMENT ==="production"  )
      return prodLogger 
    return devLogger
}

export const addLogger = (req, res, next) => {
  const logger= getLogger();
  req.logger = logger;
  next();
};
