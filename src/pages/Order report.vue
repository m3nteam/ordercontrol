<template>
    <q-page>
        {{ prepareReport(this.dbObj) }}
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    
    export default {
        mixins: [dbObjects],

        methods:{
            prepareReport(obj){
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
                    
                    let finObj = [
                        {
                            "id" : obj.id,
                            "partner" : obj.name,
                            dataSet : result
                        }
                    ];
                    //console.log(JSON.stringify(finObj,null,4))
                    reportObj.push(finObj);
                });

                return reportObj;
            },
        }
    }
</script>

<style>

</style>