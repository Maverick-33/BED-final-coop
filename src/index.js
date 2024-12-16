import express from "express";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import loginRouter from "./routes/login.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import userRouter from "./routes/users.js";
import log from "./middleware/logMiddleware.js";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Sentry.io
Sentry.init({
  dsn: "https://f7d6397304c1809ce3cf354669dbe4c2@o4508403423510528.ingest.de.sentry.io/4508403427901520",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json()); // middleware helper, we're going to be sending you information in a format called JSON. Please make sure you understand it and put it into the req.body object for us."
app.use(log);

// app.use(log)
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/login", loginRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// The sentry error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler); // order is important, last element of the chain

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
