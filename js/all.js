
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [{
            id: '12345',
            title: '妳好',
            completed: false
        }],
        cacheTodo: {},
        cacheTitle: '',
        visibility: 'all',

    },
    methods: {
        addTodo: function () {
            var Value = this.newTodo.trim();
            var Timestamp = Math.floor(Date.now());

            if (!Value) {
                return;
            }
            //將資料傳至data裡面
            this.todos.push({
                id: Timestamp,
                title: Value,
                completed: false
            });
            this.newTodo = '';
        },
        //刪除 設定一個參數在li的v-for裡
        removeTodo: function (index) {
            this.todos.splice(index, 1)
        },
        //先到data新增暫存的變數
        editTodo: function (item) {
            //接著把item的資料 先存入cacheTodo的object
            this.cacheTodo = item;
            //在把itme.title存入cacheTitle裡
            this.cacheTitle = item.title;
        },
        //取消編輯
        cancelEdit: function () {
            this.cacheTodo = {}
        },
        //確定編輯內容 記得參數要帶上
        doneEdit: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
            this.cacheTodo = {};
        }
    },
    //建立一個同步的todo資料 取代原本data裡的todo
    computed: {
        //fiteredTodo要去取代li v-for裡的todos
        filteredTodo: function () {
            //新增一個if的判斷式
            if (this.visibility == 'all') {
                return this.todos;
            } else if (this.visibility == 'active') {
                //宣告一個新的arry存篩選出來的todos資料
                var newTodos = [];
                //用forEach做篩選
                this.todos.forEach(function (item) {
                    //用if條件式設定為item未completed的資料
                    if (!item.completed) {
                        //把篩選出來的值放置newTodos的arry裡
                        newTodos.push(item);
                    }
                })
                //最後將newTodos回傳
                return newTodos;
            } else if (this.visibility == 'completed') {
                //宣告一個新的arry存篩選出來的todos資料
                var newTodos = [];
                //用forEach做篩選
                this.todos.forEach(function (item) {
                    //用if條件式設定為item未completed的資料
                    if (item.completed) {
                        //把篩選出來的值放置newTodos的arry裡
                        newTodos.push(item);
                    }
                })
                //最後將newTodos回傳
                return newTodos;
            }
        }
    },
});