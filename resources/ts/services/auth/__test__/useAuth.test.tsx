import {render, screen} from '@testing-library/react';
import { authContext, ProvideAuth } from '../useAuth';
import { ILogin } from 'src/types';
import { useContext } from 'react';

describe('testing useAuth', () => {
    const {login} = useContext(authContext);
    const testLogin: ILogin = {
        phone: '(680) 456-1296',
        password: '12345678',
    }

    it('can login user:', () => {
        
    
        login(testLogin).then(res => {  
            console.log(res);
            expect(res.data).toBeTruthy();
        }).catch(err => {
            console.log(err);
        })
    })

    it('cannot login user With Invalid Credential:', () => {
        // TODO
    })

    it('can logout user:', () => {
        // TODO
    })

    it('cookies set successfuly:', () => {
        // TODO
    })

})