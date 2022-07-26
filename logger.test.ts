import { FunctionalLogger, Severity } from "./logger";

test('logs simple message in Json format', () =>{
 
    const logMessage = "Hello"
    
    const expectedLogStatement = {message: logMessage, severity: Severity.INFO}
    const logger = new FunctionalLogger()
    
    const logOutput = logger.log(logMessage)

    expect(logOutput).toEqual(expectedLogStatement)
 
});


/*
    include severity
    (verbosity level)

    TRACE
    DEBUG
    INFO
    WARN
    ERROR

    logger.log by default INFO
    or pass explicitly
    logger.log(message, severity)

    severity is an enum of the above
*/
test('logs simple message with custom severity in Json format', () =>{
 
    const logMessage = "Hello"
    const severity = Severity.TRACE
    
    const expectedLogStatement = {message: logMessage, severity: severity}
    const logger = new FunctionalLogger()
    
    const logOutput = logger.log(logMessage, severity)

    expect(logOutput).toEqual(expectedLogStatement)
 
});
