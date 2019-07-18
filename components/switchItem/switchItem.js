Component({
    properties: {
        dataItem: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        tapSwitch() {
            this.triggerEvent('myevent', {})
        }
    }
})