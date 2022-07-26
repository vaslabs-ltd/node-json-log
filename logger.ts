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

/*
    enums are singleton types (single instance within the virtual machine process (nodejs runs in a v8 VM))

    sealed trait Severity
    case object INFO extends Severity

    Set of Severity (DEBUG, INFO)

    class A(Boolean, Boolean) => 2x2 = 4 // unlimited instances of A
    Severity (size N) = N // N instances of Severity
*/