export default {
  rootClass: 'horizontal',
  list: [{
    id: 0,
    icon: 'caret-down',
    title: '0-0-0',
    active: false,
    subset: [{
      id: 1,
      title: '1-1-1',
      type: 'item',
    },{
      id: 2,
      title: '2-2-2',
      type: 'item',
      subset: [{
        id: 3,
        title: '3-3-3',
        type: 'item',
        subset: [{
          id: 4,
          title: '4-4-4',
          type: 'item',
        },{
          id: 5,
          title: '5-5-5',
          type: 'item',
        }]
      },{
        id: 6,
        title: '6-6-6',
        type: 'item',
      }]
    }]
  },{
    id: 7,
    icon: 'address-book',
    title: 'Navigation Two',
    type: 'item',
    subset: [{
      id: 8,
      title: 'navigation one',
      type: 'item',
    },{
      id: 9,
      title: 'navigation two',
      type: 'item',
    }]
  },{
    id: 10,
    icon: 'caret-down',
    title: '0-0-0',
    active: false,
    subset: [{
      id: 11,
      title: '1-1-1',
      type: 'item',
    },{
      id: 12,
      title: '2-2-2',
      type: 'item',
      subset: [{
        id: 13,
        title: '3-3-3',
        type: 'item',
        subset: [{
          id: 14,
          title: '4-4-4',
          type: 'item',
        },{
          id: 15,
          title: '5-5-5',
          type: 'item',
        }]
      },{
        id: 16,
        title: '6-6-6',
        type: 'item',
      }]
    }]
  }]
}