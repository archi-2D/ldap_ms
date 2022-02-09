import { connection } from '../commons/interfaces.js';
import ldap from 'ldapjs';

const createClient = () => {
    let client = ldap.createClient({
        url: connection.LDAP
    });
    return client;
}
/*
const modifyEntryField = (userId, key, value) => {
    return new Promise((resolve, reject) => {
        let client = createClient();
        let cn = (userId.includes('+')) ? userId.split('+')[1]: userId;
        let dn = `cn=${cn},ou=sa,dc=netflis,dc=com`;

        let modification = {};
        modification[key] = value;

        const change = new ldap.Change({
            operation: 'replace',
            modification: modification
        });

        client.bind('cn=admin,dc=netflis,dc=com', 'admin', err => {
            if(err)
                reject(err);

            client.modify(dn, change, err => {
                if(err) 
                    reject(err);
                
                resolve();
            });
        });
    });
}
*/
const createEntry = (idUser, userName,lastName, password) => {
    return new Promise((resolve, reject) => {

        let cn = userName;
        let newDN = `cn=${cn},ou=sa,dc=netflis,dc=com`;
        
        //let fullName = name.split(' ');
        //let firstName = fullName[0];
        //let pass = password;
        
        let newUser = { 
            givenname: userName,
            sn: lastName,
            uid: userName,
            userPassword: password,
            uidNumber: `${idUser}`,
            gidNumber: '500',
            homeDirectory: `/home/users/${userName}`,
            objectClass: [ 'inetOrgPerson', 'posixAccount', 'top' ]
        }
        
        let client = createClient();

        client.bind('cn=admin,dc=netflis,dc=com', 'admin', err => {
            if(err)
                reject(err);

            client.add(newDN, newUser, err => {
                if(err)
                    reject(err);

                resolve();
            });
        });
    });
}


export function searchUserLDAP(userId){
    return new Promise((resolve, reject) => {
        let user = null;
        let opts = {
            filter: `(&(objectClass=inetOrgPerson)(uid=${userId}))`,
            scope: 'sub',
            attributes: []
        }

        let client = createClient();

        client.bind('cn=admin,dc=netflis,dc=com', 'admin', (error)=>{
            if(error)
                reject(error);

            client.search('dc=netflis,dc=com', opts, (error, res) => {
                res.on('searchEntry', entry => { user = entry.object });
                res.on('error', err => { reject(err) });
                res.on('end', () => { resolve(user) });
            })
        });
    });
}

export function createUserLDAP(idUser, userName, lastName, password){
    return new Promise( async (resolve, reject) => {
        try {
            await createEntry(idUser, userName, lastName, password);
            let user = await searchUserLDAP(userName);
            resolve(user);
        }
        catch(e){
            reject(e);
        }
    });
}
/*
export function modifyUserLDAP(userId, name){
    return new Promise( async (resolve, reject) => {
        
        let fullName = name.split(' ');
        let firstName = fullName[0];
        let lastName = (fullName.length > 1) ?  fullName[1] : firstName;

        try{
            await modifyEntryField(userId, 'givenname', firstName);
            await modifyEntryField(userId, 'sn', lastName);
            await modifyEntryField(userId, 'userPassword', name);
            let user = await searchUserLDAP(userId);
            resolve(user);
        }
        catch(e){
            reject(e);
        }
        
    });
}
*/

/*
export function deleteUserLDAP(userId, name){
    return new Promise((resolve, reject) => {

        let cn = (userId.includes('+')) ? userId.split('+')[1]: userId;
        let dn = `cn=${cn},ou=sa,dc=netflis,dc=com`;
        
        let client = createClient();

        client.bind('cn=admin,dc=netflis,dc=com', 'admin', err => {
            if(err)
                reject(err);

            client.del(dn, err => {
                if(err)
                    reject(err);

                resolve();
            });
        });
    });

}*/