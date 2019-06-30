import React from 'react';
import Snap from 'snapsvg-cjs';
//insert Element.prototype.limitDrag function here
class SheetMusic extends React.Component{
  svgRender() {
    let svg = Snap("#svg" + this.props.keyId.toString())
    //svg.line(30, 30, this.props.width-30, 30).attr({stroke: '#000'})
    Snap.load("Test.svg", (data) => {
      console.log("hu")

      svg.rect(0,0,this.props.width,this.props.height).attr(
        {fill: '#FFF', stroke:'#000', strokeWidth:'5'})
      //svg.line(30, this.calculateLineHeight(0), this.props.width-30, this.calculateLineHeight(0)).attr({stroke: '#000', strokeWidth:'2'})
      this.drawLine(0,svg)
      this.drawLine(1,svg)
      this.drawLine(2,svg)
      this.drawLine(3,svg)
      this.drawLine(4,svg)
      this.drawNotes(svg, this.props.json.notes)
      //svg.append(data)
    })

    //var myCircle2 = svg.circle(30,30,20)
    // myCircle2.attr({ stroke: '#123456', 'strokeWidth': 3,
    //    fill: this.props.fill, 'opacity': 0.2 })
  }
  drawNotes(svg, lo_notes) {
    var num = 0
    lo_notes.forEach((note) => {
      this.drawNote(svg, num, note.relative_value)
      num += 1
    })
  }

  // TODO : disgustingly hard coded
  drawNote(svg, posx, posy) {
    svg.ellipse(100 + (posx * this.lineHeight() * 2),
    this.A_position() - (posy * (this.lineHeight() / 2)),
    this.lineHeight() / 2, this.lineHeight() / 2)
  }

  drawLine(no, svg) {
    svg.line(30, this.calculateLineHeight(no), this.props.width-30, this.calculateLineHeight(no)).attr({stroke: '#000', strokeWidth:'2'})
  }

  lineHeight() {
    return (this.props.height / 15)
  }

  calculateLineHeight(no) {
    return no * this.lineHeight() + this.props.height / 3
  }

  A_position() {
    return this.calculateLineHeight(4) - (3 * this.lineHeight() / 2)
  }

  componentDidMount() {
    this.svgRender()
   }

   componentDidUpdate() {
     this.svgRender()
   }

render () {
     const idKey = "svg" + this.props.keyId.toString()
    return (
      <svg style={this.props.style}
            width={this.props.width} height={this.props.height} id={idKey}/>
    )
  }
}
export default SheetMusic
