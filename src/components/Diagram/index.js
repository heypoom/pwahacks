import React, {Component} from "react"
import fuzzy from "fuzzysearch"

import {
  DiagramEngine, DefaultNodeFactory, DefaultLinkFactory, DiagramWidget,
  DefaultNodeInstanceFactory, DefaultPortInstanceFactory, LinkInstanceFactory,
  DiagramModel
} from "storm-react-diagrams"

import initial from "./models"

import {registerDiamondWidget, DiamondNodeModel, DiamondPortModel} from "./DiamondNode"
import {registerCustomWidget, CustomNodeModel, CustomPortModel} from "./CustomNode"

import s from "./NodeGraph.sass"

const config = {
  allowLooseLinks: false,
  allowCanvasZoom: true
}

const random = (min, max) => Math.floor((Math.random() * (max - min)) + min)

const colors = [
  "lightblue"
]

const MockNode = ({onClick}) => (
  <div className="node mock" onClick={onClick}>
    <div className="basic-node custom_node" style={{background: "#1abc9c"}}>
      <svg className="node_edit custom_node" viewBox="0 0 24 24">
        <path d="M20.719 7.031l-1.828 1.828-3.75-3.75 1.828-1.828c0.375-0.375 1.031-0.375 1.406 0l2.344 2.344c0.375 0.375 0.375 1.031 0 1.406zM3 17.25l11.063-11.063 3.75 3.75-11.063 11.063h-3.75v-3.75z" />
      </svg>
      <div className="title">
        <div className="name">Create Node</div>
      </div>
      <div className="ports">
        <div className="in">
          <div className="in-port">
            <div className="port" />
            <div className="name">IN</div>
          </div>
        </div>
        <div className="out">
          <div className="in-port">
            <div className="name">OUT</div>
            <div className="port" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

/**
 * @class NodeSearch
 * @desc Automatically Selects a node after searching.
 */

export default class NodeGraph extends Component {
  engine = new DiagramEngine()
  model = new DiagramModel()

  componentWillMount() {
    const engine = this.engine
    const model = this.model
    const data = JSON.parse(localStorage.getItem("node_graph") || initial)

    // Register the Module Factories
    engine.registerNodeFactory(new DefaultNodeFactory())
    engine.registerLinkFactory(new DefaultLinkFactory())

    // Register the Instance Factories for Serialization
    engine.registerInstanceFactory(new DefaultNodeInstanceFactory())
    engine.registerInstanceFactory(new DefaultPortInstanceFactory())
    engine.registerInstanceFactory(new LinkInstanceFactory())

    // Register the Custom Node Types
    registerDiamondWidget(engine)
    registerCustomWidget(engine)

    // Set Diagram Model
    model.deSerializeDiagram(data, engine)
    engine.setDiagramModel(model)
  }

  componentWillUnmount() {
    this.save()
  }

  add = () => {
    const model = this.model
    const node = new CustomNodeModel("Compute Node", colors[random(0, colors.length)])
    node.x = 400
    node.y = 0

    const iPort = new CustomPortModel(true, "in-something", "IN")
    const oPort = new CustomPortModel(false, "out-something", "OUT")

    node.addPort(iPort)
    node.addPort(oPort)
    model.addNode(node)
    this.forceUpdate()
  }

  addDiamond = () => {
    const model = this.model
    const node = new DiamondNodeModel(colors[random(0, colors.length)])
    node.x = 400
    node.y = 0

    const iPort = new DiamondPortModel(true, "in-node", "IN")

    node.addPort(iPort)
    model.addNode(node)
    this.forceUpdate()
  }

  onNodeSearch = event => {
    const diagram = this.model.serializeDiagram()
    const result = diagram.nodes.filter(node => fuzzy(event.target.value, node.name))

    if (result[0]) {
      if (this.model.nodes[result[0].id]) {
        this.model.nodes[result[0].id].locked = true
        this.model.nodes[result[0].id].selected = true
        this.engine.repaintCanvas()
      }
    }
  }

  unlockNodes = () => {
    Object.values(this.model.nodes).forEach(item => {
      this.model.nodes[item.id].locked = false
    })
  }

  save = () => {
    localStorage.setItem("node_graph", JSON.stringify(this.model.serializeDiagram()))
  }

  load = () => {
    const data = JSON.parse(localStorage.getItem("node_graph"))

    // HACK: Insane setTimeout(0) hack. No Idea how it worked.
    //       You might want to reinstantiate this.model too.
    const r = () => {
      this.model.deSerializeDiagram(data, this.engine)
      this.engine.setDiagramModel(this.model)
      this.forceUpdate()
    }

    r()
    setTimeout(r, 0)
  }

  render = () => (
    <div className={s.wrapper}>
      <div className={s.btngroup}>
        <button onClick={this.save}>Save</button>
        <button onClick={this.load}>Load</button>
      </div>
      <div className="nodes-store">
        <MockNode onClick={this.add} />
      </div>
      <DiagramWidget diagramEngine={this.engine} {...config} />
    </div>
  )
}
