# ldap_ms

Instrucciones para correr

Para docker (Asegurarse que el docker daemon este corriendo):
0. Abrir una consola donde se encuentre el archivo docker-compose.yml
1. docker compose up
2. Confirmar que este corriendo el ms

En el ms:
0. Abrir otra consola diferente de donde esta corriendo el docker
1. npm install
2. node index.js

LDAP
0. Abrir en browser localhost:8085
1. Loguearse con: 
--> user: cn=admin,dc=netflis,dc=com
--> pass: admin
2. Crear una nueva entrada
--> tipo Generic: Posix Group
--> nombre: user
--> commit
3. Crear una nueva entrada
--> Generic: Organizational Unit
--> nombre: sa

POSTMAN
1. Petición POST a localhost:9000/ldap/createUser
2. json (siemre el idUser debe ser diferent)
{
    "idUser":3,
    "userName": "any username",
    "lastName": "any lastname",
    "password": "any password"
}
