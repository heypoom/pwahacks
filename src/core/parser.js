import recast from "recast"

export default input => {
  let code = ""

  try {
    code = recast.parse(input)
  } catch (e) {
    console.error("AST Parser Error:", e)
    return e
  }

  console.log(code)

  code.program.body.forEach(item => {
    console.log(`--- LINE [${item.loc.start.column}:${item.loc.start.line} - ${item.loc.end.column}:${item.loc.end.line}]---`)

    switch (item.type) {
      case "VariableDeclaration":
        console.log(item.type, item.declarations[0])
        break
      case "ExpressionStatement":
        if (item.expression.type === "AssignmentExpression") {
          console.log(item.expression, item.expression.left)
          if (item.expression.left.object.type === "Identifier") {
            console.log("Name:", item.expression.left.object.name)
          }
        }
        console.log(item.type, item)
        break
      case "ImportDeclaration":
        console.log(item.type, item)
        break
      case "ExportDefaultDeclaration":
        console.log(item.type, item)
        break
      case "FunctionDeclaration":
        console.log(item.type, item)
        break
      case "IfStatement":
        console.log(item.type, item)
        break
      default:
        console.log("Unmatched Type", item.type)
    }
  })
}
