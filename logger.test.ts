import { FunctionalLogger, Severity, TargetLogger } from "./logger";

test('logs simple message in Json format', () =>{
 
    const logMessage = "Hello"
    
    const expectedLogStatement = {message: logMessage, severity: Severity.INFO}
    const logger = new FunctionalLogger()
    
    const logOutput = logger.log(logMessage)

    expect(logOutput).toEqual(expectedLogStatement)
 
});

test("logs message with custom property from user", () =>{
    const logMessage = "Hello"
    const customValue = "something"
    
    const expectedLogStatement = {message: logMessage, severity: Severity.INFO, customProperty: customValue}
    const logger = new FunctionalLogger()

    const logOutput = logger.log(logMessage, Severity.INFO, {customProperty: customValue})

    expect(logOutput).toEqual(expectedLogStatement)
})

test("custom properties take precedence over logger properties", () => {
    const logMessage = "Hello"
    const customValue = "something"
    
    const expectedLogStatement = {message: logMessage, severity: customValue}
    const logger = new FunctionalLogger()

    const logOutput = logger.log(logMessage, Severity.INFO, {severity: customValue})

    expect(logOutput).toEqual(expectedLogStatement)
})


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

test('logs simple message to target', () => {
    const logMessage = "Hello"
    const expectedLogStatement = {message: logMessage, severity: Severity.INFO}

    let target: string = "";

    const logger = new TargetLogger(json => {target = JSON.stringify(json);})

    logger.log(logMessage)

    expect(target).toEqual(JSON.stringify(expectedLogStatement))
})

test('logs messages with severity to target', () => {
        const logMessage = "Hello"
        const expectedLogStatement: (s: Severity) => {message: String, severity: Severity} = 
            (s: Severity) => ({message: logMessage, severity: s})

        let target: string = "";

        const logger = new TargetLogger(json => {target = JSON.stringify(json);})

        logger.info(logMessage)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.INFO)))

        logger.warn(logMessage)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.WARN)))

        logger.trace(logMessage)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.TRACE)))

        logger.debug(logMessage)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.DEBUG)))

        logger.error(logMessage)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.ERROR)))
    }
)


test('logs messages with severity and custom property to target', () => {
        const logMessage = "Hello"
        const expectedCustomProperties = {traceId: "somevalue"}
        const expectedLogStatement: (s: Severity) => {message: string, severity: Severity} = 
            (s: Severity) => ({message: logMessage, severity: s, ...expectedCustomProperties})

        let target: string = "";

        const logger = new TargetLogger(json => {target = JSON.stringify(json);})

        logger.info(logMessage, expectedCustomProperties)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.INFO)))

        logger.warn(logMessage, expectedCustomProperties)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.WARN)))

        logger.trace(logMessage, expectedCustomProperties)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.TRACE)))

        logger.debug(logMessage, expectedCustomProperties)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.DEBUG)))

        logger.error(logMessage, expectedCustomProperties)
        expect(target).toEqual(JSON.stringify(expectedLogStatement(Severity.ERROR)))
    }
)
