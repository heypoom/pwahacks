import React from "react"
import merge from "lodash.merge"

import {
  AbstractInstanceFactory, NodeWidgetFactory,
  NodeModel, PortModel, PortWidget
} from "storm-react-diagrams"

/**
  @module DiamondNode
**/

const defaultColor = "#1abc9c"

/**
  @func getPorts
  @desc Render the Ports as React Components
  @param size: The Size
**/

const getPorts = size => {
  const top = {position: "absolute", zIndex: 2, top: (size / 2) - 8, left: -8}
  const left = {position: "absolute", zIndex: 2, left: (size / 2) - 8, top: -8}
  const right = {position: "absolute", zIndex: 2, left: size - 8, top: (size / 2) - 9}
  const bottom = {position: "absolute", zIndex: 2, left: (size / 2) - 8, top: size - 8}

  return [{
    n: "left", s: left
  }, {
    n: "top", s: top
  }, {
    n: "right", s: right
  }, {
    n: "bottom", s: bottom
  }]
}

/**
  @func DiamondNodeWidget
  @desc The rendered Node Component
  @param {node}: The Node
  @param {size}: The Size
**/

export const DiamondNodeWidget = ({node, size = 150}) => {
  const points = `10,${size / 2} ${size / 2},10 ${size - 10},${size / 2} ${size / 2},${size - 10}`
  const style = {position: "relative", width: size, height: size}

  return (
    <div className="diamond_node" style={style}>
      <svg width={size} height={size}>
        <g id="Layer_1" />
        <g id="Layer_2">
          <polygon
            fill={node.color} stroke="#000000" strokeWidth="3"
            strokeMiterlimit="10" points={points}
          />
        </g>
      </svg>

      {getPorts(size).map(item => (
        <div style={item.s} key={item.n}>
          <PortWidget name={item.n} node={node} />
        </div>
      ))}
    </div>
  )
}

/**
  @class DiamondWidgetFactory
  @desc Instance Factory for Module Registration
**/

export const DiamondNodeWidgetFactory = React.createFactory(DiamondNodeWidget)

export class DiamondWidgetFactory extends NodeWidgetFactory {
  constructor() {
    super("Diamond")
  }

  generateReactWidget = (engine, node) => DiamondNodeWidgetFactory({node})
}

/**
  @class DiamondPortModel
  @desc The Port's Data Model
**/

export class DiamondPortModel extends PortModel {
  constructor(pos = "top") {
    super(pos)
    this.position = pos
  }

  serialize = () => merge(super.serialize(), {
    position: this.position
  })

  deSerialize(data) {
    super.deSerialize(data)
    this.position = data.position
  }
}

/**
  @class DiamondNodeModel
  @desc The Node's Data Model
**/

export class DiamondNodeModel extends NodeModel {
  constructor(color = defaultColor) {
    super("Diamond")

    this.color = color

    this.addPort(new DiamondPortModel("top"))
    this.addPort(new DiamondPortModel("left"))
    this.addPort(new DiamondPortModel("bottom"))
    this.addPort(new DiamondPortModel("right"))
  }

  serialize = () => merge(super.serialize(), {
    color: this.color
  })

  deSerialize(object) {
    super.deSerialize(object)
    this.color = object.color
  }
}

/**
  @class DiamondNodeFactory/DiamondPortFactory
  @desc The Instance Factories used for serialization,
**/

export class DiamondNodeFactory extends AbstractInstanceFactory {
  constructor() {
    super("DiamondNodeModel")
  }

  getInstance = () => new DiamondNodeModel()
}

export class DiamondPortFactory extends AbstractInstanceFactory {
  constructor() {
    super("DiamondPortModel")
  }

  getInstance = () => new DiamondPortModel()
}

/**
  @func registerDiamondWidget
  @desc Automatic Dependency Registration of Factory Modules
**/

export const registerDiamondWidget = engine => {
  engine.registerNodeFactory(new DiamondWidgetFactory())
  engine.registerInstanceFactory(new DiamondNodeFactory())
  engine.registerInstanceFactory(new DiamondPortFactory())
}
