class Partner {
    constructor(partnerObj) {
      this._id = partnerObj._id,
      this.id = partnerObj.id,
      this.name = partnerObj.name,
      this.active = partnerObj.active,
      this.orders = partnerObj.orders
    }

    getPartnerOrder(id){
        return this.orders.filter(order => order.id_ord == id);
    }

    getPartnerOrdersCount(){
        return this.orders.length;
    }

    getPartnerOrdersLastId(){
        try {
            return this.orders[this.getPartnerOrdersCount() - 1].id_ord;
        }catch(e){
            return 0;
        }
    }

    insertOrder(orderObj){
        this.orders.push(orderObj);
        let orders = this.orders;
        return orders;
    }
  }


export default Partner;