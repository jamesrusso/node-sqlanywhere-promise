import { ConnectionParameters, createConnection, Statement } from "sqlanywhere";

export interface SQLAnywhereConnectionParameters extends ConnectionParameters {
}

export class SQLAnywhereStatement { 
  
  constructor(private _statement: Statement) { 
  }

  public exec(args : any[]) : Promise<any[] | Error> { 
    return new Promise((resolve, reject) => { 
      this._statement.exec(args, (err, rows) => {
      if (err) { 
         return reject(err);
      }
      resolve(rows);
     })
    })
  } 
}

export class SQLAnywhereConnection {
  private _conn = createConnection();

  public connect(params : SQLAnywhereConnectionParameters) : Promise<Error | undefined> { 
    return new Promise((resolve, reject) => { 
      return this._conn.connect(params, (err) => { 
          if (err) { 
            return reject(err);
          }
          resolve();
      })
    });
  }

  public prepare(sql: string) : Promise<SQLAnywhereStatement> { 
    return new Promise((resolve, reject) => { 
      this._conn.prepare(sql, (err, stmt) => { 
        if (err) { 
          return reject(err);
        }
        resolve(new SQLAnywhereStatement(stmt));
      })
    });
  }

  public query(sql: string, params?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this._conn.exec(sql, params || [], (err: Error | undefined, rows: any) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    });
  }

  public commit() : Promise<Error | void> { 
    return new Promise((resolve, reject) => { 
      this._conn.commit((err) => { 
        if (err) { 
          reject(err);
        } else { 
          resolve();
        }
      })
    });
  }

  public rollback() : Promise<Error | void> { 
    return new Promise((resolve, reject) => { 
      this._conn.rollback((err) => { 
        if (err) { 
          reject(err);
        } else { 
          resolve();
        }
      })
    });
  }

  public close() : Promise<Error | void> { 
    return new Promise((resolve, reject) => { 
      this._conn.close((err) => { 
        if (err) { 
          reject(err);
        } else { 
          resolve();
        }
      })
    })
  }
}
