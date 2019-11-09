export default {
    methods:{
        getInitials(name){
        // Function returns initials for partners
            var names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
                if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase();
            }
            return initials;
        },

        prepareReport(obj){
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
                })
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
        }
    }
}