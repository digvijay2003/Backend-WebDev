const bcrypt = require('bcrypt');
const { has } = require('langs');

const hashPassword = async(pw) =>{
    const hash = await bcrypt.hash(pw,12);
    console.log(hash);
}

const login = async(pw,hashPw) =>{
    const result = bcrypt.compare(pw,hashPw);
    if(result){
        console.log('Successfully Logged In')
    } else{
        console.log('Incorrect Password!')
    }
}

// hashPassword('monkey');

login('monkey','$2b$12$1uvGeuHP8ysPyjUMsZHseeHkezMjFL8eO.yP5D0p7jyLvuyw3D3Yi')