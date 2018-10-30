
export default {
  toggleCollapsed:() => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  },
  createBook:() => {
    kn.post({url: 'http://localhost:3000/api/book?f=fff&m=mm'}, {a: 'a', b: 'b'})
      .then(res => console.log(res))
  },
};
