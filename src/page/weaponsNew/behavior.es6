import kn from '../../../assets/server'
export default {
  state: {
    collapsed: false,
    book: {
      title: false,
      description: false,
    }
  },
  _nameHandle: function(title) {
    let { book } = this.state;
    book.title = title
    this.setState({ book });
  },
  _descriptionHandle: function(description) {
    let { book } = this.state;
    book.description = description
    this.setState({ book });
  },
  createBook: function() {
    let { book } = this.state;
    kn.post({url: kn.root + 'api/book'}, book)
      .then(res => console.log(res))
  },
};
