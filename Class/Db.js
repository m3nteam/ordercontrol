export default class DbClass{
    constructor(dbObject){
        this.dbData=dbObject;
    }

    getPartnerById(id){
        return this.dbData.filter(partner => partner._id == id);
    }
}