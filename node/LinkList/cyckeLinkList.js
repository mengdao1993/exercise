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
        if (arguments === 1) {
            element = index
            index = this.len
        }
        if (index < 0 || index > this.len) throw new Error('超出边界')
        if (index === 0) {
            let head = this.head
            let newHead = new Node(element, head)
            // 让尾巴指向新头，但是链表可能为空
            let last = this.len === 0 ? newHead : this._ndoe(this.len - 1)
            this.head = newHead
            last.next = newHead
        } else {
            // 在中间添加是不影响循环效果的，只有在第一个添加的时候，需要有一个尾部
            // 指向头部的过程
            let prevNode = this._ndoe(index - 1) // 获取上一个节点
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
        if (index === 0) {
            let last = this._ndoe(this.l - 1)
            this.head = this.head.next // 让头部删除掉
            last.next = this.head // 让尾部的下一个指向新头
        } else {
            let prevNode = this._ndoe(index - 1)
            prevNode.next = prevNode.next.next
        }
        this.len--
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
let ll = new LinkList()
ll.add('1')
ll.add('2')
ll.add('3')
ll.add('4')
console.log(ll)