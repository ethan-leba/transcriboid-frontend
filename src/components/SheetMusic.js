import React from "react";
import PropTypes from "prop-types";
import Snap from "snapsvg-cjs";

class SheetMusic extends React.Component {
  state = {
    hovernote: []
  };

  svgRender() {
    let svg = Snap("#svg" + this.props.keyId.toString());
    // NOTE: This method seems kind of clunky...
    Snap.load("http://127.0.0.1:8887/svg_notes/stem_up/eighth_note.svg", e => {
      Snap.load(
        "http://127.0.0.1:8887/svg_notes/stem_up/quarter_note.svg",
        q => {
          Snap.load(
            "http://127.0.0.1:8887/svg_notes/stem_up/half_note.svg",
            h => {
              Snap.load("http://127.0.0.1:8887/svg_notes/whole_note.svg", w => {
                let eg = e.select("g");
                let qg = q.select("g");
                let hg = h.select("g");
                let wg = w.select("g");
                const note_shapes = [eg, qg, hg, wg];
                svg.rect(0, 0, this.props.width, this.props.height).attr({
                  fill: "#FFF",
                  stroke: "#000",
                  strokeWidth: "5"
                });
                this.drawLine(0, svg);
                this.drawLine(1, svg);
                this.drawLine(2, svg);
                this.drawLine(3, svg);
                this.drawLine(4, svg);
                for (var i = -7; i <= 6; i++) {
                  this.drawBoundingBox(1.25 + i * -0.5, i, svg);
                }
                this.drawNotes(
                  svg,
                  note_shapes,
                  this.props.notes.concat(this.state.hovernote)
                );
              });
            }
          );
        }
      );
    });
  }

  // Draws all the notes onto the lines
  drawNotes(svg, lo_shape, lo_notes) {
    var num = 0;
    lo_notes.forEach(note => {
      this.drawNote(svg, lo_shape, num, note.relative_value, note.duration);
      num += 1;
    });
  }

  // Draws a note onto the page given a position and a duration
  drawNote(svg, lo_shape, posx, posy, duration) {
    const x = 100 + posx * this.lineHeight() * 2;
    const y = this.C_position() - posy * (this.lineHeight() / 2);
    var shapey = null;
    switch (duration) {
      case 0.125:
        shapey = lo_shape[0].clone();
        break;
      case 0.25:
        shapey = lo_shape[1].clone();
        break;
      case 0.5:
        shapey = lo_shape[2].clone();
        break;
      case 1:
        shapey = lo_shape[3].clone();
        break;
      default:
        break;
    }
    shapey.attr({
      transform: `translate(${x}, ${y})`,
      pointerEvents: "none"
    });
    svg.append(shapey);
  }

  // Draws the lines representing the lines of the sheet music
  drawLine(no, svg) {
    svg
      .line(
        this.props.marginX,
        this.calculateLineHeight(no),
        this.props.width - this.props.marginX,
        this.calculateLineHeight(no)
      )
      .attr({
        stroke: "#000",
        strokeWidth: "2"
      });
  }

  // Draws the bounding boxes for placing notes
  drawBoundingBox(no, noteval, svg) {
    const bb = svg
      .rect(
        this.props.marginX,
        this.calculateLineHeight(no),
        this.props.width - this.props.marginX * 2,
        this.lineHeight() / 2
      )
      .attr({
        fill: "rgba(50,50,50,.0)"
      });
    const g = svg.group(bb);
    // g.hover(
    //   () => {
    //   this.setState({hovernote: [{relative_value: noteval, duration: 0.25}]})
    //   },
    //   () => {
    //   this.setState({hovernote: []})
    //   })
    g.click(() => {
      this.props.addNote(noteval);
    });
  }

  // The height or distance between each line on the sheet music
  lineHeight() {
    return this.props.height / 25;
  }

  // The absolute position of an individual line
  calculateLineHeight(no) {
    return no * this.lineHeight() + this.props.height / 3;
  }

  // The position of the C note
  C_position() {
    return this.calculateLineHeight(3) - (3 * this.lineHeight()) / 2;
  }

  componentDidMount() {
    this.svgRender();
  }

  componentDidUpdate() {
    this.svgRender();
  }

  render() {
    const idKey = "svg" + this.props.keyId.toString();
    return (
      <svg
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
        id={idKey}
      />
    );
  }
}

SheetMusic.propTypes = {
  keyId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  marginX: PropTypes.number,
  addNote: (props, propName, componentName) => {
    if (
      props["editable"] === true &&
      (props[propName] === undefined || typeof props[propName] != "function")
    ) {
      return new Error("addNote is required if the sheet music is editable!");
    }
  },
  notes: PropTypes.array.isRequired,
  editable: PropTypes.bool,
  comparison: PropTypes.bool
};

SheetMusic.defaultProps = {
  marginX: 30,
  editable: true,
  comparison: false
};

export default SheetMusic;
