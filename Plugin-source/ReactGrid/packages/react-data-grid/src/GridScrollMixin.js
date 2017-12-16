const ReactDOM = require('react-dom');

module.exports = {

  componentDidMount() {
    this._scrollLeft = this.viewport ? this.viewport.getScroll().scrollLeft : 0;
    this._scrollLeft = this.viewportFixed ? this.viewportFixed.getScroll().scrollLeft : 0;
    this._onScroll();
  },

  componentDidUpdate() {
    //This line generates a scroll problem, when editing bottom rows
    //this._onScroll();
  },

  componentWillMount() {
    this._scrollLeft = undefined;
  },

  componentWillUnmount() {
    this._scrollLeft = undefined;
  },

  onScroll(props) {
    if (this._scrollLeft !== props.scrollLeft) {
      this._scrollLeft = props.scrollLeft;
      this._onScroll();
    }
  },

  onFixedScroll(props) {
    if (this._scrollLeft !== props.scrollLeft) {
      this._scrollLeft = props.scrollLeft;
      this._onScroll();
    }
  },

  onHeaderScroll(e) {
    // let scrollLeft = e.target.scrollLeft;
    // if (this._scrollLeft !== scrollLeft) {
    //   this._scrollLeft = scrollLeft;
    //   this.header.setScrollLeft(scrollLeft);
    //   let canvas = ReactDOM.findDOMNode(this.viewport.canvas);
    //   canvas.scrollLeft = scrollLeft;
    //   this.viewport.canvas.setScrollLeft(scrollLeft);
    //   this.footer.setScrollLeft(scrollLeft);
    // }
  },

  onFooterScroll(e) {
    return;
  },

  _onScroll() {
    if (this._scrollLeft !== undefined) {
      this.header.setScrollLeft(this._scrollLeft);
      this.footer.setScrollLeft(this._scrollLeft);
      // debugger;
      if (this.viewport) {
        this.viewport.setScrollLeft(this._scrollLeft);
          const fr = document.querySelector('.fixed-grid-rows .react-grid-Canvas');
          fr.scroll(this._scrollLeft,0);
      }
      if(this.viewportFixed) {
        this.viewportFixed.setScrollLeft(this._scrollLeft);
        const rw = document.querySelector('.grid-rows .react-grid-Canvas');
        rw.scroll(this._scrollLeft,0);
      }
    }
  }
};
