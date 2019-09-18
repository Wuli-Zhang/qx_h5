export default {
  /**
   * 获取当前打开的工作空间
   */
  getActiveWorkspace: state => {
    return state.seie3d.activeWorkspace
  },
  /**
   * 获取Ajax对象
   */
  getAjax: state => {
    return state.seie3d.Ajax
  },
  getOption: state => {
    return state.seie3d.option
  }
}
