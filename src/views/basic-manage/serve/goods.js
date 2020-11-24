const pList = [{
    id: '1',
    label: '食品饮料'
}, {
    id: '2',
    label: '美容化妆'
}, {
    id: '3',
    label: '进口食品'
}, {
    id: '4',
    label: '钟表箱包'
}, {
    id: '5',
    label: '母婴玩具'
}, {
    id: '6',
    label: '厨房用品'
}, {
    id: '7',
    label: '营养保健'
}, {
    id: '8',
    label: '服装鞋靴'
}]

const list = [{
    parentId: '1',
    id: '1-1',
    label: '休闲零食'
}, {
    parentId: '1',
    id: '1-2',
    label: '饮料'
}, {
    parentId: '2',
    id: '2-1',
    label: '面部护肤'
}, {
    parentId: '2',
    id: '2-2',
    label: '眼部保养'
}]

const sList = [{
    parentId: '1-1',
    id: '1-1-1',
    label: '坚果'
}, {
    parentId: '1-1',
    id: '1-1-2',
    label: '蜜饯'
}, {
    parentId: '1-1',
    id: '1-1-3',
    label: '肉干'
}, {
    parentId: '1-2',
    id: '1-2-1',
    label: '碳酸饮料'
}, {
    parentId: '1-2',
    id: '1-2-2',
    label: '茶饮料'
}, {
    parentId: '2-1',
    id: '2-1-1',
    label: '洁面'
}, {
    parentId: '2-1',
    id: '2-1-2',
    label: '乳液'
}, {
    parentId: '2-2',
    id: '2-2-1',
    label: '眼霜'
}, {
    parentId: '2-2',
    id: '2-2-2',
    label: '眼膜'
}]

export {
    pList,
    list,
    sList
}
