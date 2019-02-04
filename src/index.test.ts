import { SQLAnywhereConnection, SQLAnywhereConnectionParameters } from './sqlanywherepromise'

var params: SQLAnywhereConnectionParameters = {
    Server: 'server',
    Host: 'serverhostname',
    UserId: 'dba',
    Password: 'sql'
  };
  
(async () => { 
  try { 
    const x = new SQLAnywhereConnection();
    await x.connect(params);  
    const results = await x.query("select * from patient where last_name like ?", ['%russo%']);
    const statement = await x.prepare("selet count(*) as count from patient where last name = ?");
    const results2 = statement.exec(['Russo']);
    console.log(results);
    console.log(results2);
  } catch (error) { 
    console.log(error);
  }
  })();
  