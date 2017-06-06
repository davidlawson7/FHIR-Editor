/**
 * A custom class to hold the logs for each session.
 */
export class Log {
  private theLog: LogEntry[];

  constructor() {
    this.theLog = [];
  }

  public getLog(): any[] {
    return this.theLog;
  }

  public debug(message: string) {
    let m = `DEBUG:: ${message}`;
    let entry = new LogEntry(Date.now(), 'green', m);
    this.theLog.push( entry );
  }

  public error(message: string) {
    let m = `ERROR:: ${message}`;
    let entry = new LogEntry(Date.now(), 'orange', m);
    this.theLog.push( entry );
  }

  public fatal(message: string) {
    let m = `FATAL:: ${message}`;
    let entry = new LogEntry(Date.now(), 'red', m);
    this.theLog.push( entry );
  }

  public info(message: string) {
    let m = `INFO:: ${message}`;
    let entry = new LogEntry(Date.now(), 'blue', m);
    this.theLog.push( entry );
  }

  public trace(message: string) {
    let m = `TRACE:: ${message}`;
    let entry = new LogEntry(Date.now(), 'grey', m);
    this.theLog.push( entry );
  }

  public warn(message: string) {
    let m = `WARN:: ${message}`;
    let entry = new LogEntry(Date.now(), 'yellow', m);
    this.theLog.push( entry );
  }
}

class LogEntry {
  constructor(public time: number, public color: string, public message: string){};
}
