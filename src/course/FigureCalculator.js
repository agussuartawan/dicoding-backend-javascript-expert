class FigureCalculator {
    constructor(mathBasic) {
        this._mathBasic = mathBasic
    }

    calculateRectanglePerimeter(...args) {
        const [length, width] = this._mathBasic.validate(...args)
        return this._mathBasic.multiply(2, this._mathBasic.add(length, width))
    }

    calculateRectangleArea(...args) {
        const [length, width] = this._mathBasic.validate(...args)
        return this._mathBasic.multiply(length, width)
    }

    calculateTrianglePerimeter(...args) {
        const [a, b, base] = this.validate(...args)
        const side = this._mathBasic.add(a, b)
        return this._mathBasic.add(side, base)
    }

    calculateTriangleArea(...args) {
        const [base, height] = this._mathBasic.validate(...args)
        const side = this._mathBasic.multiply(base, height)
        return this._mathBasic.divide(side, 2)
    }

    validate = (...args) => {
        if (args.length !== 3) {
            throw new Error("Function only receives 3 parameters")
        }

        const [a, b, c] = args
        if (
            typeof a !== "number" ||
            typeof b !== "number" ||
            typeof c !== "number"
        ) {
            throw new Error("Function only receives number parameters")
        }

        return [a, b, c]
    }
}

module.exports = FigureCalculator
