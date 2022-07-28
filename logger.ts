export enum Severity {
    TRACE = "TRACE",
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}


export class FunctionalLogger{
    log(logMessage: string, severity: Severity = Severity.INFO, userProperties: object = {}) {
        
       return ({message: logMessage, severity: severity, ...userProperties})
    }
}

export class TargetLogger{
    
    jsonLogger: FunctionalLogger
    sendToTarget: (j: any) => void;

    constructor(sendToTarget: (j: any) => void ){
        this.jsonLogger = new FunctionalLogger();
        this.sendToTarget = sendToTarget
    }

    info(logMessage: string, customProperties: object = {}) {
        this.log(logMessage, Severity.INFO, customProperties)
    }

    warn(logMessage: string, customProperties: object = {}) {
        this.log(logMessage, Severity.WARN, customProperties)
    }

    trace(logMessage: string, customProperties: object = {}) {
        this.log(logMessage, Severity.TRACE, customProperties)
    }

    debug(logMessage: string, customProperties: object = {}) {
        this.log(logMessage, Severity.DEBUG, customProperties)
    }

    error(logMessage: string, customProperties: object = {}) {
        this.log(logMessage, Severity.ERROR, customProperties)
    }
    
    log(logMessage: string, severity: Severity = Severity.INFO, customProperties: object = {}){
        const json = this.jsonLogger.log(logMessage, severity, customProperties)
        this.sendToTarget(json)
    }
}

/*
    enums are singleton types (single instance within the virtual machine process (nodejs runs in a v8 VM))

    sealed trait Severity
    case object INFO extends Severity

    Set of Severity (DEBUG, INFO)

    class A(Boolean, Boolean) => 2x2 = 4 // unlimited instances of A
    Severity (size N) = N // N instances of Severity
*/