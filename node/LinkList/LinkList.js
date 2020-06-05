class Node {
    constructor(element, next) {
        this.element = element
        this.next = next
    }
}
class LinkList {
    constructor() {
        this.head = null
        this.len = 0
    }
    _ndoe(index) {
        // 获取索引也可能有越界问题
        if (index < 0 || index > this.len) throw new Error('超出边界')
        let current = this.head
        for (let i = 0; i < index; i++) {
            current = current.next // 不停的找下一个元素，找到索引的位置
        }
        return current
    }
    add(index, element) { // 在尾部添加， 在中间添加
        if (arguments.length === 1) {
            element = index
            index = this.len
        }
        if (index < 0 || index > this.len) throw new Error('超出边界')
        if (index === 0) {
            let head = this.head
            this.head = new Node(element, head)
        } else {
            // 获取当前要添加的索引的上一个元素
            let prevNode = this._ndoe(index - 1) // 获取上一个节点
            // 让上一个节点的下一个节点指向新增的节点，当前这个节点的下一个指向的是prevNode.next
            prevNode.next = new Node(element, prevNode.next)
        }
        this.len++
    }
    // 获取节点
    get(index) {
        return this._ndoe(index)
    }
    // 设置节点
    set(index, element) {
        let node = this._ndoe(index)
        node.element = element
    }
    // 删除指定节点
    remove(index) {
        let node = null
        if (index === 0) {
            node = this.head
            if (!node) {
                return undefined
            }
            this.head = this.head.next
        } else {
            let prevNode = this._ndoe(index - 1)
            node = prevNode.next
            prevNode.next = prevNode.next.next
        }
        this.len--
        return node
    }
    // 清空链表
    clear() {
        this.head = null
        this.len = 0
    }
    // 递归的形式
    // reverseList() {
    //     let head = this.head
    //     function reverse(head) {
    //         if (head === null || head.next === null) return head
    //         let newHead = reverse(head.next) // 可以找到链表的最终节点
    //         head.next.next = head
    //         head.next = null
    //         return newHead
    //     }
    //     return reverse(head)
    // }
    // 非递归形式
    reverseList () {
        let head = this.head
        // 如果只有一个元素或者什么都没有就不需要反转了
        if (head === null || head.next === null) return head
        let newHead = null
        while(head) {
            let temp = head.next // 保存2节点
            head.next = newHead // 将1指向null
            newHead = head // 将新的链表头 指向1
            head = temp // 让老的头指向2
        }
        return newHead
    }
}
module.exports = LinkList