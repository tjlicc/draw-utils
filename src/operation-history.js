// 操作记录
export default class OperationHistory {

  constructor() {
    this.steps = []
    this.index = -1
  }

  _clone(data) {
    return JSON.parse(JSON.stringify(data))
  }

  saveStep(step) {
    this.index = this.index < 0 ? this.steps.length + this.index : this.index
    // 如果撤销过程中有除了撤销和重做以外的操作就抛弃后面的记录
    if (this.index < this.steps.length - 1) {
      this.steps.splice(this.index + 1, this.steps.length - 1 - this.index)
    }
    this.steps.push(this._clone(step))
    // 记录步骤时游标始终指向最后一步
    this.index += 1
  }

  canUndo() {
    return this.steps.length > 0 && this.index > 0
  }

  undo(callback) {
    this.index = this.index < 0 ? this.steps.length + this.index - 1 : this.index - 1
    if (this.index < 0) {
      this.index += 1
    } else {
      let step = this._clone(this.steps[this.index])
      callback && callback(step)
    }
  }

  canRedo() {
    return this.steps.length > 0 && this.index < this.steps.length - 1
  }

  redo(callback) {
    this.index = this.index < 0 ? this.steps.length + this.index + 1 : this.index + 1
    if (this.index > this.steps.length - 1) {
      this.index -= 1
    } else {
      let step = this._clone(this.steps[this.index])
      callback && callback(step)
    }
  }
}
