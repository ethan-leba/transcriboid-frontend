import React from "react";
import PropTypes from "prop-types";
import Snap from "snapsvg-cjs";

class SheetMusic extends React.Component {
  state = {
    hovernote: null
  };

  svgRender() {
    let svg = Snap("#svg" + this.props.keyId.toString());
    // NOTE: This method seems kind of clunky...
    Snap.load("http://127.0.0.1:5000/resources/stem_up/eighth_note.svg", e => {
      Snap.load(
        "http://127.0.0.1:5000/resources/stem_up/quarter_note.svg",
        q => {
          Snap.load(
            "http://127.0.0.1:5000/resources/stem_up/half_note.svg",
            h => {
              Snap.load("http://127.0.0.1:5000/resources/whole_note.svg", w => {
                svg.clear();
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
                if (this.props.editable) {
                  for (var i = -7; i <= 7; i++) {
                    this.drawBoundingBox(1.25 + i * -0.5, i, svg);
                  }
                }
                this.drawNotes(svg, note_shapes, this.getHoverArray());
              });
            }
          );
        }
      );
    });
  }

  getHoverArray = () => {
    if (this.state.hovernote === null) {
      return this.props.notes;
    } else {
      return [
        ...this.props.notes,
        {
          relative_value: this.state.hovernote,
          duration: this.props.selectedDuration
        }
      ];
    }
  };

  // Draws all the notes onto the lines
  drawNotes(svg, lo_shape, lo_notes) {
    var num = 0;
    lo_notes.forEach(note => {
      this.drawNote(svg, lo_shape, num, note);
      num += 1;
    });
  }

  // Draws a note onto the page given a position and a duration
  drawNote(svg, lo_shape, no, note) {
    const x = 100 + no * this.lineHeight() * 2;
    const y = this.C_position() - note.relative_value * (this.lineHeight() / 2);
    var shapey = null;
    switch (note.duration) {
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
      pointerEvents: "none",
      fill: "rgb(3,100,3)"
    });
    svg.append(shapey);
    if (this.props.comparison) {
      svg.ellipse(x, 30, 6, 6).attr({
        fill: note.correct ? "#4ED81A" : "#FF336E"
      });
    }
    this.drawLedgerLines(svg, no, note);
  }

  //TODO: this can be abstracted.
  // Draws the ledger lines depending on the value of the note
  drawLedgerLines(svg, no, note) {
    const x = 100 + no * this.lineHeight() * 2;
    if (note.relative_value < -6) {
      svg
        .line(
          x - 15,
          this.calculateLineHeight(5),
          x + 15,
          this.calculateLineHeight(5)
        )
        .attr({
          stroke: "#000",
          strokeWidth: "2"
        });
    }
    if (note.relative_value > 4) {
      svg
        .line(
          x - 15,
          this.calculateLineHeight(-1),
          x + 15,
          this.calculateLineHeight(-1)
        )
        .attr({
          stroke: "#000",
          strokeWidth: "2"
        });
    }
    if (note.relative_value > 6) {
      svg
        .line(
          x - 15,
          this.calculateLineHeight(-2),
          x + 15,
          this.calculateLineHeight(-2)
        )
        .attr({
          stroke: "#000",
          strokeWidth: "2"
        });
    }
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

  // TODO: empty note on dehover
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
    g.mousedown(() => {
      this.props.addNote(noteval);
    });
    g.hover(
      () => {
        this.setState({hovernote: noteval});
      },
      () => {
        this.setState({hovernote: null});
      }
    );
  }

  // The height or distance between each line on the sheet music
  lineHeight() {
    return this.props.height / 20;
  }

  // The absolute position of an individual line
  calculateLineHeight(no) {
    return no * this.lineHeight() + this.props.height / 2.75;
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
        className="sheetmusic"
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
  notes: PropTypes.array.isRequired,
  editable: PropTypes.bool,
  comparison: PropTypes.bool,
  addNote: (props, propName, componentName) => {
    if (
      props["editable"] === true &&
      (props[propName] === undefined || typeof props[propName] != "function")
    ) {
      return new Error("addNote is required if the sheet music is editable!");
    }
  },
  selectedDuration: (props, propName, componentName) => {
    if (
      props["editable"] === true &&
      (props[propName] === undefined || typeof props[propName] != "number")
    ) {
      return new Error(
        "The select duration is required if the sheet music is editable!"
      );
    }
  }
};

SheetMusic.defaultProps = {
  marginX: 30,
  editable: true,
  comparison: false
};

export default SheetMusic;
