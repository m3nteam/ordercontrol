const state = {
    allData: [
        {
            "id" : "00001", 
            "name": "Kupac1", 
            "orders" : [
                { 
                    "id_ord" :"1",
                    "date" : "2019-10-01", 
                    "data" : 
                    [ 
                        { "code" : "003362", "product" : "GC Gradia A1", "total" : 1, "__index" : 0 }, 
                        { "code" : "003363", "product" : "GC Gradia A2", "total" : 2, "__index" : 1 },
                    ]
                },
                { 
                    "id_ord" :"2",
                    "date" : "2019-10-02", 
                    "data" : 
                    [ 
                        { "code" : "003362", "product" : "GC Gradia A1", "total" : 1, "__index" : 0 }, 
                        { "code" : "003363", "product" : "GC Gradia A2", "total" : 2, "__index" : 1 },
                    ]
                }
            ]
        },
        {
            "id" : "00002", 
            "name": "Kupac2", 
            "orders" : [
                { 
                    "id_ord" :"1",
                    "date" : "2019-10-01", 
                    "data" : 
                    [ 
                        { "code" : "003364", "product" : "GC Gradia A1", "total" : 2, "__index" : 0 }, 
                        { "code" : "003365", "product" : "GC Gradia A2", "total" : 3, "__index" : 1 },
                    ]
                },
                { 
                    "id_ord" :"2",
                    "date" : "2019-10-02", 
                    "data" : 
                    [ 
                        { "code" : "003364", "product" : "GC Gradia A1", "total" : 2, "__index" : 0 }, 
                        { "code" : "003365", "product" : "GC Gradia A2", "total" : 3, "__index" : 1 },
                    ]
                }
            ] 
        }
    ]
};

const mutations = {};

const actions = {};

const getters = {};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}