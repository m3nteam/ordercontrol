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
        }
    }
}