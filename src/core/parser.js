import recast from "recast"

const parse = item => {
  switch (item.type) {
    case "VariableDeclaration":
      console.log(item.type, item.declarations[0])
      if (item.declarations[0]) {
        const decl = item.declarations[0]
        return [
          "VariableDeclaration",
          decl.id.type,
          decl.init.arguments ? decl.init.arguments[0].type : decl.init.type
        ]
      }
    case "ExpressionStatement":
      if (item.expression) {
        const exp = item.expression
        if (exp.left) {
          return [
            "AssignmentExpression",
            exp.left.property ? exp.left.property.name : "?",
            exp.operator,
            exp.right.value || exp.right.type
          ]
        } else if (exp.callee && exp.arguments) {
          return [
            "CallExpression",
            ...(exp.arguments.map(x => x.type))
          ]
        }
        return ["ExpressionStatement"]
      }
      console.log(item.type, item)
    case "ImportDeclaration":
      console.log(item.type, item)
      return [item.type]
    case "ExportDefaultDeclaration":
      if (item.declaration.body) {
        const blocks = item.declaration.body.body.map(parse)[0]
        console.log(blocks)
        return [item.type, ...blocks]
      }
    case "FunctionDeclaration":
      console.log(item.type, item)
      return [item.type]
    case "IfStatement":
      console.log(item.type, item)
      return [
        item.type,
        item.test.left.type,
        item.test.operator,
        item.test.right.type
      ]
    default:
      return [item.type]
  }
}

export default input => {
  let code = ""

  try {
    code = recast.parse(input)
    console.info(code.program.body)
  } catch (e) {
    console.error("AST Parser Error:", e)
    return e
  }

  return code.program.body.map(item => {
    console.log(`--- LINE [${item.loc.start.column}:${item.loc.start.line} - ${item.loc.end.column}:${item.loc.end.line}]---`)

    return parse(item)
  })
}
