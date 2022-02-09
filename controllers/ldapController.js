import { searchUserLDAP, createUserLDAP/*, modifyUserLDAP, deleteUserLDAP*/ } from  '../services/ldapService.js'

const authentication = {
    findUser: async (req, res) => {
        let userName = req.body.userName;
        const response = await searchUserLDAP(userName);

        if(response === null)
            res.status('404');
        
        res.send(response);
    },
    createUser: async (req, res) => {
        let idUser = req.body.idUser
        let userName = req.body.userName;
        let lastName = req.body.lastName;
        let password = req.body.password;

        try{
            const response = await createUserLDAP(idUser, userName, lastName, password);
            res.send(response);
        }
        catch(e){
            res.status('400');
            res.send(e);
        }
    },
    /*
    modifyUser: async (req, res) => {
        let userName = req.body.userName;
        let password = req.body.password;

        try{
            const response = await modifyUserLDAP(userName, password);
            res.send(response);
        }
        catch(e){
            res.status('400');
            res.send(e);
        }
    },
    deleteUser: async (req, res) => {
        let userName = req.body.userName;
        let password = req.body.password;

        try{
            const response = await deleteUserLDAP(userName, password);
            res.send(response);
        }
        catch(e){
            res.status('400');
            res.send(e);
        }
    }*/
};

export default authentication;