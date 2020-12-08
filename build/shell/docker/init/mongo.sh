echo "init mongo user"
mongo -u root -p 1234 << EOF
use admin;
db.createUser({
   user: "admin",
   pwd: "123456",
   roles: [
    {
      "role" : "userAdminAnyDatabase",
      "db" : "admin"
    }, 
    {
      "role" : "readWriteAnyDatabase",
      "db" : "admin"
    },
    {
      "role" : "dbAdminAnyDatabase",
      "db" : "admin"
    }
  ]
});
use config_center;
db.createUser({
  user: "root",
  pwd: "1234",
  roles: [{ role: "readWrite", db: "config_center" }]
});
EOF

