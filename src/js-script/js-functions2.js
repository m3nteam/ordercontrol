class jsFunctions{
    static prepareReport(obj){
    //Prepares data for report
        let reportObj = [];

        obj.forEach(obj => {
            let prepData = [];
            const picked = (({ orders }) => ({ orders }))(obj);
            const pickedFin = (({ orders }) => (Object.values(orders)))(picked);

            pickedFin.forEach(pic => {
                pic.data.forEach(fin => {
                    prepData.push(fin);
                })
            });

            const myData = prepData;

            // Calculate the sums and group data (while tracking count)
            const reduced = myData.reduce((m, d) => {
                if(!m[d.code]){
                    m[d.code] = {...d, count: 1};
                    return m;
                }
                    m[d.code].total += d.total;
                    return m;
            }, {});
            
            // Create new array from grouped data and compute the average
            const result = Object.keys(reduced).map((k) => {
                const item  = reduced[k];
                return {
                    code: item.code,
                    product: item.product,
                    total: item.total,
                }
            });
            
            let finObj = 
                {
                    "id" : obj.id,
                    "partner" : obj.name,
                    dataSet : result
                };

            //console.log(JSON.stringify(finObj,null,4))
            reportObj.push(finObj);
        });

        return reportObj;
    };

    static productOptionsByPartner(allData, partnerId){
        let partnerProducts = allData.filter(data => data.id == partnerId);
        let productList = [];        
        
        partnerProducts[0].orders.forEach(order =>{
            order.data.forEach(product => {
                let productObj = { code: product.code, product: product.product }
                let newProduct = true;

                for (let i = 0; i < productList.length; i++) {
                    if (productList[i].code == product.code && productList.length !== 0) {
                        newProduct = false;
                        break;
                    };
                };

                if (newProduct) {
                    productList.push(productObj);
                };
            });
        });

        return productList;
    };

    static filterObj(data, filters){
        return data.filter(val => {
            let result = true;

            for(var i = 0; i < filters.length; i++){
                if(val[filters[i][0]] != filters[i][1])
                    result = false;

                return result;
            };
        });
    };

}

export default jsFunctions;