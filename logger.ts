export enum Severity {
    TRACE = "TRACE",
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}

export class FunctionalLogger{
    log(logMessage: string, severity: Severity = Severity.INFO) {
        
       return ({message: logMessage, severity: severity})
    }
}

export class TargetLogger{
    
    jsonLogger: FunctionalLogger
    sendToTarget: (j: any) => void;

    constructor(sendToTarget: (j: any) => void ){
        this.jsonLogger = new FunctionalLogger();
        this.sendToTarget = sendToTarget
    }

    info(logMessage: string) {
        this.log(logMessage)
    }

    warn(logMessage: string) {
        this.log(logMessage, Severity.WARN)
    }

    trace(logMessage: string) {
        this.log(logMessage, Severity.TRACE)
    }

    debug(logMessage: string) {
        this.log(logMessage, Severity.DEBUG)
    }

    error(logMessage: string) {
        this.log(logMessage, Severity.ERROR)
    }
    
    log(logMessage: string, severity: Severity = Severity.INFO){
        const json = this.jsonLogger.log(logMessage, severity)
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