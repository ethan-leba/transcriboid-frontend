import React from 'react';
import Snap from 'snapsvg-cjs';
//insert Element.prototype.limitDrag function here
class Slider extends React.Component{
  componentDidMount() {
    var s = Snap("#svg" + this.props.keyId.toString())
    s.line(30, 30, this.props.width-30, 30).attr({stroke: '#000'})
    var myCircle2 = s.circle(30,30,20)
    myCircle2.attr({ stroke: '#123456', 'strokeWidth': 3,
       fill: this.props.fill, 'opacity': 0.2 })
   }
render () {
     const idKey = "svg" + this.props.keyId.toString()
    return (
      <svg style={this.props.style}
            width={this.props.width} height="60" id={idKey}/>
    )
  }
}
export default Slider
