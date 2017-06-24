import React, {Component} from "react"
import merge from "lodash.merge"
import filter from "lodash.filter"

import {
  AbstractInstanceFactory, NodeWidgetFactory,
  NodeModel, PortModel, PortWidget
} from "storm-react-diagrams"

/**
  @module CustomNode
**/

const defaultColor = "#e74c3c"

/**
  @func getPorts
  @desc Render the Ports as React Components
  @param node: Node
  @param isIn? Is this for the Input Port?
**/

const getPorts = (node, isIn) => {
  const func = isIn ? node.getInPorts : node.getOutPorts

  // NOTE: NAME AND LABEL IS NOT THE SAME! NAME IS AN IDENTIFIER.
  //       Time Spent: 50 Minutes
  return func().map(port => {
    const widget = <PortWidget name={port.name} node={node} />
    const text = <div className="name">{port.label}</div>

    return (
      <div className={isIn ? "in-port" : "out-port"} key={port.id}>
        {isIn ? widget : text}
        {isIn ? text : widget}
      </div>
    )
  })
}

/**
  @func deleteNode
  @desc Remove the Node from the Diagram
**/

const deleteNode = (node, engine) => {
  if (confirm("Are you sure you want to delete this node?")) {
    node.remove()
    engine.repaintCanvas()
  }
}

const editIcon = `M20.719 7.031l-1.828 1.828-3.75-3.75 1.828-1.828c0.375-0.375 1.031-0.375 1.406 0l2.344 2.344c0.375 0.375 0.375 1.031 0 1.406zM3 17.25l11.063-11.063 3.75 3.75-11.063 11.063h-3.75v-3.75z`

/**
 * @class NodeEditingWidget
 * @desc Widget for Editing Node Information
**/

class NodeEditingWidget extends Component {
  state = {isEditing: false}

  remove = () => {
    if (confirm("Are you sure you want to delete this node?")) {
      this.props.node.remove()
      this.props.engine.repaintCanvas()
    }
  }

  set = (key, event) => {
    this.props.node.selected = false
    this.props.node[key] = event.target.value
    this.props.engine.repaintCanvas()
  }

  close = () => this.setState({isEditing: false})
  open = () => this.setState({isEditing: true})

  render() {
    const {node} = this.props

    return (
      <div>
        {node.selected && (
          <svg className="node_edit" viewBox="0 0 24 24" onClick={this.open}>
            <path d={editIcon} />
          </svg>
        )}
        {this.state.isEditing && (
          <div>
            Oh okay!
          </div>
        )}
      </div>
    )
  }
}

/**
  @func CustomNodeWidget
  @desc The rendered Node Component
  @param {node}: The Node
**/

export const CustomNodeWidget = ({node, engine}) => (
  <div className="basic-node custom_node" style={{background: node.color}}>
    <NodeEditingWidget node={node} engine={engine} />
    {node.selected && (
      <svg className="node_delete" viewBox="0 0 24 24" onClick={() => deleteNode(node, engine)}>
        <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z" />
      </svg>
    )}
    <div className="title">
      <div className="name">{node.name}</div>
    </div>
    <div className="ports">
      <div className="in">{getPorts(node, true)}</div>
      <div className="out">{getPorts(node)}</div>
    </div>
  </div>
)

/**
  @class CustomWidgetFactory
  @desc Instance Factory for Module Registration
**/

export const CustomNodeWidgetFactory = React.createFactory(CustomNodeWidget)

export class CustomWidgetFactory extends NodeWidgetFactory {
  constructor() {
    super("Custom")
  }

  generateReactWidget = (engine, node) => CustomNodeWidgetFactory({node, engine})
}

/**
  @class CustomPortModel
  @desc The Port"s Data Model
**/

export class CustomPortModel extends PortModel {
  constructor(isInput = "true", name = "unknown", label, id) {
    super(name, id)
    this.in = isInput
    this.label = label || name
  }

  serialize = () => merge(super.serialize(), {
    in: this.in,
    label: this.label
  })

  deSerialize(data) {
    super.deSerialize(data)
    this.in = data.in
    this.label = data.label
  }
}

/**
  @class CustomNodeModel
  @desc The Node"s Data Model

  @func getInPorts
  @func getOutPorts
**/

export class CustomNodeModel extends NodeModel {
  constructor(name = "Untitled Node", color = defaultColor) {
    super("Custom")

    this.name = name
    this.color = color
  }

  serialize = () => merge(super.serialize(), {
    name: this.name,
    color: this.color,
  })

  deSerialize(object) {
    super.deSerialize(object)
    this.name = object.name
    this.color = object.color
  }

  getInPorts = () => filter(this.ports, port => port.in) || []

  getOutPorts = () => filter(this.ports, port => !port.in) || []
}

/**
  @class CustomNodeFactory/CustomPortFactory
  @desc The Instance Factories used for serialization,
**/

export class CustomNodeFactory extends AbstractInstanceFactory {
  constructor() {
    super("CustomNodeModel")
  }

  getInstance = () => new CustomNodeModel()
}

export class CustomPortFactory extends AbstractInstanceFactory {
  constructor() {
    super("CustomPortModel")
  }

  getInstance = () => new CustomPortModel()
}

/**
  @func registerCustomWidget
  @desc Automatic Dependency Registration of Factory Modules
**/

export const registerCustomWidget = engine => {
  engine.registerNodeFactory(new CustomWidgetFactory())
  engine.registerInstanceFactory(new CustomNodeFactory())
  engine.registerInstanceFactory(new CustomPortFactory())
}
