const testsDomainContext = require.context('./domain', true, /.test$/);
testsDomainContext.keys().forEach(testsDomainContext);

const testsActionsContext = require.context('./actions', true, /.test$/);
testsActionsContext.keys().forEach(testsActionsContext);

const testsComponentsContext = require.context('./components', true, /.test$/);
testsComponentsContext.keys().forEach(testsComponentsContext);

const testsPagesContext = require.context('./pages', true, /.test$/);
testsPagesContext.keys().forEach(testsPagesContext);

const testsReducersContext = require.context('./reducers', true, /.test$/);
testsReducersContext.keys().forEach(testsReducersContext);

const testsUtilsContext = require.context('./utils', true, /.test$/);
testsUtilsContext.keys().forEach(testsUtilsContext);
