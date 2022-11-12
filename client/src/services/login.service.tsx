import { sessionStore } from '../stores/session.store';

export interface SecurityQuestion {
    id: number,
    question: string
}

export class LoginService {
    URL = 'http://localhost:8888/'

    async fetchSecurityQuestions() {
        let res = await fetch(`${this.URL}api/getSecurityQuestions`, {
            method: 'GET',
            referrerPolicy: 'no-referrer'
        })

        let data: {questions: SecurityQuestion[]} = await res.json()
        return data.questions
    }

    async registerUser(formData) {
        const {reconfirmPassword, ...data} = formData
        console.log(data)

        let res = await fetch(`${this.URL}users/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        if (res.ok)
            return await res.json()
        else
            throw Error((await res.json()).error)
    }

    async login(formData: {email: string, password: string}) {
        const {...data} = formData

        let res = await fetch(`${this.URL}users/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json'
            }
        })

        if(res.ok) {
            let {token, role} = (await res.json())
            console.log(token)
            sessionStore.update(state => ({token, role}))
            await localStorage.setItem('jwtToken', token)
            await localStorage.setItem('role', role)
        } else
            throw Error((await res.json()).error)

    }
    

}