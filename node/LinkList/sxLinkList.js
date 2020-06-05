// 双向链表的好处 不光有头 还有尾
// 查找的时候 可以判断当前是从前查找还是从尾部查找
// 节点互相记住

class Node {
    constructor(element, prev, next) {
        this.element = element
        this.prev = prev
        this.next = next
    }
}
class LinkList {
    constructor() {
        this.head = null
        this.tail = null
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
        // 添加时需要拿到当前添加的位置节点，再获取他的上一个
        if (index === this.len) { // 空链表
            // 向后添加
            let tail = this.tail
            this.tail = new Node(element, tail, null)
            if (tail === null) {
                this.head = this.tail
            } else {
                tail.next = this.tail
            }

        } else {
            // 向前或者向中间添加
            let nextNode = this._ndoe(index)
            let prevNode = nextNode.prev
            let node = new Node(element, prevNode, nextNode) // 相当于创建了2个线，
            // 让当前节点记住他的上一个和下一个是谁
            nextNode.prev = node
            if (prevNode === null) {
                this.head = node // 如果没有上一个那添加的就是头
            } else {
                prevNode.next = node
            }
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
    reverseList() {
        let head = this.head
        // 如果只有一个元素或者什么都没有就不需要反转了
        if (head === null || head.next === null) return head
        let newHead = null
        while (head) {
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