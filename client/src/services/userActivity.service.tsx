export class UserActivityService{
    URL = 'http://localhost:8888/userActivity/'

    async reportUserActivity(searchString, policyId) {
        const data = {
            searchString,
            policyId
        }
        let res = await fetch(`${this.URL}addUserActivity`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })

        return res
    }
}