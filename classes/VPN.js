const { spawn } = require('child_process');
const {RunProcess} = require('./Process');

// Path to your shell script
const scriptPath = 'ikev2.sh';

async function AddNewUser(userName) {
    const scriptArgs = ['--addclient', userName];

    // Trying to add new user
    try {
        const status = await RunProcess(scriptPath, scriptArgs);
        switch(status){
            case 'completed':
                return true;
                break;
            default:
                break
        }
    }
    // If user not added, catch error
    catch(e){
        console.log(e)
        return false;
    }
}

async function GetUserInfo(){

}

async function RevokeUser(userName){
    const scriptArgs = ['--revokeclient', userName];

    // Trying to add new user
    try {
        const status = await RunProcess(scriptPath, scriptArgs, true);
        switch(status){
            case 'completed':
                return true;
                break;
            default:
                break
        }
    }
    // If user not added, catch error
    catch(e){
        console.log(e)
        return false;
    }
}

module.exports = {AddNewUser, RevokeUser};