import recast from "recast"

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

    switch (item.type) {
      case "VariableDeclaration":
        console.log(item.type, item.declarations[0])
        return {type: item.type, declarations: item.declarations}
      case "ExpressionStatement":
        if (item.expression.type === "AssignmentExpression") {
          console.log(item.expression, item.expression.left)
          if (item.expression.left.object.type === "Identifier") {
            console.log("Name:", item.expression.left.object.name)
            return {
              type: item.expression.type,
              left: item.expression.left,
              right: item.expression.right
            }
          }
        }
        console.log(item.type, item)
        return {type: item.type, item, unmatched: true}
      case "ImportDeclaration":
        console.log(item.type, item)
        return {type: item.type, item}
      case "ExportDefaultDeclaration":
        console.log(item.type, item)
        return {type: item.type, item}
      case "FunctionDeclaration":
        console.log(item.type, item)
        return {type: item.type, item}
      case "IfStatement":
        console.log(item.type, item)
        return {type: item.type, item}
      default:
        return {type: item.type, item, unmatched: true}
    }
  })
}
