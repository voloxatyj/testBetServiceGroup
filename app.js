const app = new Vue({

    el: '#app',
    data: {
        title1: 'CRUD application',
        title2: 'secondPage',
        items: [],
        input: {
            id: '',
            name: '',
            email: '',
            phone: '',
            address: {
                street:''}
        },
        item: '',
        seen: false
    },
    created: function () {
        this.view()
        this.localData()
        this.items = JSON.parse(localStorage.getItem('items'))
    },
    methods: {
        localData: function () {
            let parsed = JSON.stringify(this.items)
            localStorage.setItem('items', parsed)
        },
        view: function () {
            this.items = [
                {
                    id: '1',
                    name: 'Slavko Rozumaka',
                    email: 'slavkorozumaka@standmail.com',
                    phone: '+380631726843',
                    address: {street:'Boulevard Of Broken Dreams'}
                }, {
                    id: '2',
                    name: 'Vladymir ZeZe',
                    email: 'volodkaYasamyjvumnij@yandex.com',
                    phone: '+386666666666',
                    address: {street:'The end Of end'}
                }, {
                    id: '3',
                    name: 'Urka Bajkonurka',
                    email: 'demojiVysky??@rumail.com',
                    phone: '+38973456789',
                    address: {street:'Creml.krasna plosha'}
                }, {
                    id: '4',
                    name: 'Julia Bilokura',
                    email: 'kosanuta@privatmail.com',
                    phone: '+3806343278963',
                    address: {street:'street of New life'}
                }, {
                    id: '5',
                    name: 'POP||RIP',
                    email: 'solodkijkolobok@lypyckmailru.com',
                    phone: '+3809412358764',
                    address: {street:'private island'}
                }
            ]
        },
        handleSave: function (id) {
            let nm = this.input.name
            let em = this.input.email
            let ph = this.input.phone
            let ad = this.input.address.street
            if(id>this.items.length){
            this
                .items
                .push({id:this.items.length+1, name: nm, email: em, phone: ph, address: {street:ad}})
            this.localData()
            app.seen=false
            swal('Added', 'Item is Added', 'success')
            } else {    
            let myid=id-1
            Object.assign(this.items[myid],this.input)
                this.handleClear()
                this.localData()
                swal('Updated', 'InformData is Updated')
            }
            },
        handleUpload() {
            this.$http.get('http://jsonplaceholder.typicode.com/users', function(data, status, request) {
            if (status == 200) {
            this.items = data
            this.localData()
            }});
            },
        handleAdded: function () {
            app.seen = true
            swal('Added', 'Please insert information in fields below;)', 'success')
            this.handleClear()
        },
        handleClear: function () {
            this.input.id = ''
            this.input.name = ''
            this.input.email = ''
            this.input.phone = ''
            this.input.address = ''
        },
        handleEdit: function (item) {
            app.seen = true
            this.input.id = item.id
            this.input.name = item.name
            this.input.email = item.email
            this.input.phone = item.phone
            this.input.address.street = item.address.street
        },
        handleDelete: function (item) {
            const del = this.items.indexOf(item)
            swal ({
                title: 'Deleted',
                text: 'You sure?',
                icon: 'error',
                buttons: true,
                dangerMode: true
            }).then (willDelete=>{
                if(willDelete) {
                    this.items.splice(del,1)
                    this.localData()
                } else {
                    
                }
            })
        }
    }
});
