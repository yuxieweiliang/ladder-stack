

export default {
  rootClass: 'horizontal', // horizontal
  dataSource: [{
    id: 0,
    icon: 'address-book',
    context: 'Navigation One',
    active: false,
    subset: [{
      id: 1,
      context: 'navigation one',
      type: 'item',
    },{
      id: 2,
      context: 'navigation two',
      type: 'item',
    }]
  },{
    id: 3,
    icon: 'address-book',
    context: 'Navigation Two',
    type: 'item',
    subset: [{
      id: 4,
      context: 'navigation one',
      type: 'item',
    },{
      id: 5,
      context: 'navigation two',
      type: 'item',
      subset: [{
        id: 8,
        context: 'navigation one',
        type: 'item',
      },{
        id: 9,
        context: 'navigation two',
        type: 'item',
      },{
        id: 10,
        context: 'navigation one',
        type: 'item',
      },{
        id: 11,
        context: 'navigation two',
        type: 'item',
      }]
    },{
      id: 6,
      context: 'navigation one',
      type: 'item',
      subset: [{
        id: 38,
        context: 'navigation one',
        type: 'item',
      },{
        id: 39,
        context: 'navigation two',
        type: 'item',
      },{
        id: 30,
        context: 'navigation one',
        type: 'item',
      },{
        id: 31,
        context: 'navigation two',
        type: 'item',
      }]
    },{
      id: 7,
      context: 'navigation two',
      type: 'item',
    }]
  },{
    id: 5,
    icon: 'address-book',
    context: 'Navigation One',
    active: false
  },{
    id: 12,
    icon: 'address-book',
    context: 'Navigation Two',
    type: 'item',
    disabled: true,
    subset: [{
      id: 13,
      context: 'navigation one',
      type: 'item',
    },{
      id: 14,
      context: 'navigation two',
      type: 'item',
    },{
      id: 15,
      context: 'navigation one',
      type: 'item',
    },{
      id: 16,
      context: 'navigation two',
      type: 'item',
    },{
      id: 17,
      context: 'navigation one',
      type: 'item',
    },{
      id: 18,
      context: 'navigation two',
      type: 'item',
    },{
      id: 19,
      context: 'navigation one',
      type: 'item',
    },{
      id: 20,
      context: 'navigation two',
      type: 'item',
    }]
  }]
}