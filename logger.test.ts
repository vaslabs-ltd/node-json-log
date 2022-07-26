import { FunctionalLogger } from "./logger";



test('logs simple message in Json format', () =>{
 
    const logMessage = "Hello"
    const expectedLogStatement = {message: logMessage}
    const logger = new FunctionalLogger()
    
    const logOutput = logger.log(logMessage)

    expect(logOutput).toEqual(expectedLogStatement)
 
});