import * as d3 from "d3"
import c3 from "c3"

export default (ctx, inject) => {
  inject("d3", d3)
  inject("c3", c3)
}
