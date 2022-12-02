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
            // Remove this line
            sessionStore.update(state => ({token, role}))

            let tokenData = {
                token,
                role,
                expiresAt: new Date(new Date().getTime() + (60000 * 60 * 24))
            }

            localStorage.setItem('jwtToken', JSON.stringify(tokenData))
            // await localStorage.setItem('role', role)
        } else
            throw Error((await res.json()).error)

    }

    static getToken() {
        let token = localStorage.getItem('jwtToken')
        if(token === null)
            return null
        let tokenData: {token: string, role: number, expiresAt: Date} = JSON.parse(token)
        console.log(tokenData, "hereeeee")

        if(Date.now() > new Date(tokenData.expiresAt).getTime()) {
            return null
        }
        return tokenData.token

    }

    static getRole() {
        let token = localStorage.getItem('jwtToken')
        if(token === null)
            return null
        let tokenData: {token: string, role: number, expiresAt: Date} = JSON.parse(token)
        if(Date.now() > new Date(tokenData.expiresAt).getTime()) {
            return null
        }
        return tokenData.role
    }

    static logout() {
        localStorage.removeItem('jwtToken')
    }

}