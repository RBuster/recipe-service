import { Strategy as LocalStrategy } from 'passport-local';
import { Manager } from '../manager';

export default new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, async function authentication(userName, password, done) {
    const manager = new Manager();
    const user = await manager.userManager.login(userName, password);
    return done(null, user);
});