import axios from 'axios';

const url = process.env.NODE_ENV === 'production'? 'api/partnerorder/' : 'http://localhost:5000/api/partnerorder/'
//const url = 'http://localhost:5000/api/partnerorder/'

class OrderService{
    //Get posts
    static getDbData(){
        return new Promise(async (resolve,reject) => {
            try{
                const res = await axios.get(url);
                resolve(
                    res.data
                );
            } catch(err){
                reject(err);
            }
        })
    }

    //Create posts
    static insertDbData(data){
        return axios.post(url, data);
    }

    //Edit posts
    static updateDbData(data){
        return axios.put(url + "/updatedata", data);
    }

}

export default OrderService;