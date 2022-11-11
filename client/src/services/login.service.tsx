export interface SecurityQuestion {
    id: number,
    question: string
}

// interface RegisterUser {
//     city: string,
//     country: string,
//     email: string,
//     firstname: string,
//     lastname: string,
//     password: string,
//     middlename: string,
//     securityAns: string,
//     securityQuestion: number,
//     state: string,
//     zip: string
// }

export class LoginService {
    URL = 'http://localhost:5000/'

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


    }
    

}