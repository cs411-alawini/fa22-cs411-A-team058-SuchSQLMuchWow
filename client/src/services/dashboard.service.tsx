import {LoginService} from './login.service'

export class DashboardService {
    URL = 'http://localhost:8888/api/dashboard/'

    // async getMaxRatingPolicies(){
    //     let res = await fetch(`${this.URL}maxRatings`, {
    //         method: 'GET',
    //         referrerPolicy: 'no-referrer',
    //         headers: {
    //             "Authorization": `Bearer ${LoginService.getToken()}`,
    //         }
    //     })

    //     let body = res.json()
    //     return body
    // }

    async getUserCountByState() {
        let res = await fetch(`${this.URL}getUserCountByState`, {
            method: 'GET',
            referrerPolicy: 'no-referrer',
            headers: {
                "Authorization": `Bearer ${LoginService.getToken()}`,
            }
        })

        let body = res.json()
        return body
    }

    async policyRatingList(sliderValue) {
        let res = await fetch(`${this.URL}getRatingRange`, {
            method: 'POST',
            body: JSON.stringify({rating: sliderValue}),
            referrerPolicy: 'no-referrer',
            headers: {
                "Authorization": `Bearer ${LoginService.getToken()}`,
                "Content-Type": 'application/json'
            }
        })

        let body = res.json()
        return body
    }

    async getLineChartData() {
        let res = await fetch(`${this.URL}getSearchByMonth`, {
            method: 'GET',
            referrerPolicy: 'no-referrer',
            headers: {
                "Authorization": `Bearer ${LoginService.getToken()}`,
            }
        })

        let body = await res.json()
        let data: {} = body.data
        console.log(data)
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", 'November', 'December'];

        const chartData = {
        labels,
        datasets: [
            {
            label: 'Search Counts',
            data: labels.map((label) => {
                return data && data[label] !== undefined ? data[label] : 0
            }),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
        };

        return chartData
    }

    async getPolicyTypeCount() {
        let res = await fetch(`${this.URL}getPolicyCounts`, {
            method: 'GET',
            referrerPolicy: 'no-referrer',
            headers: {
                "Authorization": `Bearer ${LoginService.getToken()}`,
            }
        })

        let body: {data: {}} = await res.json()
        let data = body.data

        console.log(data)

        let labels = ['Auto', 'Medical', 'Home']

        const chartData = {
            labels,
            datasets: [
              {
                label: '# of Policies',
                data: labels.map(label => data[label]),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

        return chartData

    }

    // async getUsersInCoverAmountRange(){
    //     let res = await fetch(`${this.URL}usersInCoverAmountRange`, {
    //         method: 'GET',
    //         referrerPolicy: 'no-referrer',
    //         headers: {
    //             "Authorization": `Bearer ${LoginService.getToken()}`,
    //         }
    //     })

    //     let body = res.json()
    //     return body
    // }
}